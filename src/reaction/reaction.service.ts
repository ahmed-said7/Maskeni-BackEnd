import { Model } from 'mongoose';
import { IEntityType } from './dto/interface.entity.dto';
import { HttpException } from '@nestjs/common';
import { ArrayPagination } from 'src/common/Api/array.pagination';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { CommentService } from 'src/comment/comment.service';
import { LikesService } from 'src/likes/likes.service';
import { FindQuery } from 'src/common/types';

export class ReactionService<T extends IEntityType> {
  constructor(
    private paginationArray: ArrayPagination,
    private commentService: CommentService,
    private likesService: LikesService,
  ) {}
  private PostModel: Model<T>;
  setModel(PostModel: Model<T>) {
    if (this.PostModel) {
      return this;
    }
    this.PostModel = PostModel;
    return this;
  }
  async createComment(body: CreateCommentDto) {
    const comment = await this.commentService.create(body);
    if (comment.parentComment) {
      return comment;
    }
    await this.PostModel.findByIdAndUpdate(body.post, {
      $addToSet: { comments: comment._id },
      $inc: { commentCount: 1 },
    });
    return comment;
  }
  async getAllComments(query: FindQuery, id: string) {
    const post = await this.PostModel.findById(id);
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
    await this.PostModel.findByIdAndUpdate(postId, {
      $addToSet: { likes: like._id },
      $inc: { likeCount: 1 },
    });
    return { status: 'like created' };
  }
  async getAllLikes(postId: string, query: FindQuery) {
    const post = await this.PostModel.findById(postId);
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    return this.likesService.getPostLikes(post.likes, query);
  }
  async deleteLike(postId: string, userId: string) {
    const like = await this.likesService.removeLikeFromPost({
      post: postId,
      user: userId,
    });
    await this.PostModel.findByIdAndUpdate(postId, {
      $pull: { likes: like._id },
      $inc: { likeCount: -1 },
    });
    return { status: 'like deleted' };
  }
  async createSaved(postId: string, userId: string) {
    await this.PostModel.findByIdAndUpdate(postId, {
      $addToSet: {
        saved: { user: userId },
        $inc: { savedCount: 1 },
      },
    });
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
      .populate('saved.user');
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    return { totalPages: post.savedCount, page, limit, saved: post.saved };
  }
  async deleteSaved(postId: string, userId: string) {
    await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { saved: { user: userId } },
        $inc: { savedCount: -1 },
      },
      { new: true },
    );
  }
  async createRequestedService(postId: string, userId: string) {
    await this.PostModel.findByIdAndUpdate(postId, {
      $addToSet: {
        requested: { user: userId },
      },
      $inc: { requestedCount: 1 },
    });
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
    return {
      totalPages: post.requestedCount,
      page,
      limit,
      requested: post.requested,
    };
  }
  async deleteRequestedService(postId: string, userId: string) {
    await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { requested: { user: userId } },
        $inc: { requestedCount: -1 },
      },
      { new: true },
    );
  }
}