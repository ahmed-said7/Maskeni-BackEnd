import { Model } from 'mongoose';
import { IEntityType } from './dto/interface.entity.dto';
import { HttpException, Injectable, Scope } from '@nestjs/common';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { CommentService } from 'src/comment/comment.service';
import { LikesService } from 'src/likes/likes.service';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
// import { count } from 'console';

@Injectable({ scope: Scope.TRANSIENT })
export class ReactionService<T extends IEntityType> {
  constructor(
    private commentService: CommentService,
    private likesService: LikesService,
    private apiService: ApiService<any, any>,
  ) {}
  private PostModel: Model<T>;
  setModel(PostModel: Model<T>) {
    if (this.PostModel) {
      return this;
    }
    console.log('Setting');
    this.PostModel = PostModel;
    return this;
  }
  async createComment(body: CreateCommentDto) {
    const comment = await this.commentService.create(body);
    if (comment.parentComment) {
      return comment;
    }
    await this.PostModel.findByIdAndUpdate(body.post, {
      $push: { comments: comment._id },
      $inc: { commentCount: 1 },
    });
    return comment;
  }
  async getAllComments(query: FindQuery, id: string) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const post = await this.PostModel.findById(id).select({
      comments: { $slice: [skip, limit] },
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    // const ids = post.comments.map((comment) => comment._id.toString());
    return this.commentService.getPostComments(post.comments, query);
  }
  async deleteComment(commentId: string, userId: string) {
    const result = await this.commentService.getOne(commentId);
    if (result.user.toString() == userId) {
      await this.commentService.remove(commentId);
      await this.PostModel.findByIdAndUpdate(result.post, {
        $pull: { comments: result._id },
        $inc: { commentCount: -1 },
      });
      return { status: 'deleted' };
    }
    const post = await this.PostModel.findOne({
      user: userId,
      _id: result.post,
    });
    if (!post) {
      throw new HttpException('post not found or you are not the owner', 400);
    }
    await this.commentService.remove(commentId);
    await this.PostModel.findByIdAndUpdate(result.post, {
      $pull: { comments: result._id },
      $inc: { commentCount: -1 },
    });
    return { status: 'deleted' };
  }
  async createLike(postId: string, userId: string) {
    const like = await this.likesService.addLikeToPost({
      post: postId,
      user: userId,
    });
    const post = await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $push: { likes: like._id },
        $inc: { likesCount: 1 },
      },
      {
        new: true,
      },
    );
    return { status: 'like created', post };
  }
  async getAllLikes(postId: string, query: FindQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const post = await this.PostModel.findById(postId).select({
      likes: { $slice: [skip, limit] },
    });
    if (!post) {
      throw new HttpException('document not found', 400);
    }
    return this.likesService.getPostLikes(post.likes, query);
  }
  async deleteLike(postId: string, userId: string) {
    const like = await this.likesService.removeLikeFromPost({
      post: postId,
      user: userId,
    });
    const post = await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: like._id },
        $inc: { likesCount: -1 },
      },
      {
        new: true,
      },
    );
    return { status: 'like deleted', post };
  }
  async createSaved(postId: string, userId: string) {
    const post = await this.PostModel.findOne({
      _id: postId,
      'saved.user': userId,
    });
    if (post) {
      throw new HttpException('already saved', 400);
    }
    const postSaved = await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          saved: { user: userId, createdAt: new Date() },
          $inc: { savedCount: 1 },
        },
      },
      {
        new: true,
      },
    );
    return { status: 'saved', post: postSaved };
  }
  async getAllSaved(query: FindQuery, id: string) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const post = await this.PostModel.findById(id)
      .select({
        saved: {
          $slice: [skip, limit],
        },
      })
      .populate({
        select: 'name mobile icon',
        model: 'User',
        path: 'saved.user',
      });
    // .populate({
    //   path: 'country',
    //   select: 'image nameAr nameEn',
    //   model: Country.name,
    // })
    // .populate({
    //   path: 'city',
    //   select: 'image nameAr nameEn',
    //   model: City.name,
    // })
    // .populate({
    //   path: 'quarter',
    //   select: 'image nameAr nameEn',
    //   model: Quarter.name,
    // });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const pagination = this.apiService.makePagination(
      page,
      limit,
      post.savedCount,
    );
    return { pagination, saved: post.saved };
  }
  async deleteSaved(postId: string, userId: string) {
    const post = await this.PostModel.findOne({ 'saved.user': userId });
    if (!post) {
      throw new HttpException('not saved', 400);
    }
    const postSaved = await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { saved: { user: userId } },
        $inc: { savedCount: -1 },
      },
      { new: true },
    );
    return { status: 'unsaved successfully', post: postSaved };
  }
  async createRequestedService(postId: string, userId: string) {
    const post = await this.PostModel.findOne({ 'requested.user': userId });
    if (post) {
      throw new HttpException('already requested', 400);
    }
    const reqService = await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $push: {
          requested: { user: userId, createdAt: new Date() },
        },
        $inc: { requestedCount: 1 },
      },
      {
        new: true,
      },
    );
    return { status: 'requested successfully', post: reqService };
  }
  async getAllRequestedServices(query: FindQuery, id: string) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const post = await this.PostModel.findById(id)
      .select({
        saved: {
          $slice: [skip, limit],
        },
      })
      .populate('requested.user');
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const pagination = this.apiService.makePagination(
      page,
      limit,
      post.requestedCount,
    );
    return {
      totalPages: post.requestedCount,
      pagination,
      requested: post.requested,
    };
  }
  async deleteRequestedService(postId: string, userId: string) {
    const post = await this.PostModel.findOne({ 'requested.user': userId });
    if (!post) {
      throw new HttpException('not requested', 400);
    }
    const reqService = await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { requested: { user: userId } },
        $inc: { requestedCount: -1 },
      },
      { new: true },
    );
    return { status: 'unrequested successfully', post: reqService };
  }
}
