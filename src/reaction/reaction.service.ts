import { Model } from 'mongoose';
import { IEntityType } from './dto/interface.entity.dto';
import { CreateCommentDto } from './dto/comment.create.dto';
import { HttpException } from '@nestjs/common';
import { ArrayPagination } from 'src/common/Api/array.pagination';

export class ReactionService<T extends IEntityType> {
  constructor(private paginationArray: ArrayPagination) {}
  private PostModel: Model<T>;
  setModel(PostModel: Model<T>) {
    if (this.PostModel) {
      return this;
    }
    this.PostModel = PostModel;
    return this;
  }
  async createComment(body: CreateCommentDto, postId: string) {
    const post = await this.PostModel.findByIdAndUpdate(
      postId,
      { $addToSet: { comments: body } },
      { new: true },
    );
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    post.commentCount = post.comments.length;
    await post.save();
  }
  async getAllComments(query: { page?: string; limit?: string }, id: string) {
    const post = await this.PostModel.findById(id)
      .populate('comments.user')
      .select('comments');
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    return this.paginationArray.apiPagination(query, post.comments);
  }
  async deleteComment(postId: string, commentId: string, userId: string) {
    // delete by post owner
    let post = await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: commentId, user: userId } },
      },
      { new: true },
    );
    if (!post && post.user.toString() == userId) {
      post = await this.PostModel.findByIdAndUpdate(
        postId,
        {
          $pull: { comments: { _id: commentId } },
        },
        { new: true },
      );
    }
    if (!post) {
      throw new HttpException('post not found or you are not the owner', 400);
    }
    post.commentCount = post.comments.length;
    await post.save();
  }
  async createLike(postId: string, userId: string) {
    const post = await this.PostModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: { user: userId },
      },
    });
    post.likeCount = post.likes.length;
    await post.save();
  }
  async getAllLikes(query: { page?: string; limit?: string }, id: string) {
    const post = await this.PostModel.findById(id)
      .populate('likes.user')
      .select('likes');
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    return this.paginationArray.apiPagination(query, post.likes);
  }
  async deleteLike(postId: string, userId: string) {
    const post = await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: { user: userId } },
      },
      { new: true },
    );
    post.likeCount = post.likes.length;
    await post.save();
  }
  async createSaved(postId: string, userId: string) {
    const post = await this.PostModel.findByIdAndUpdate(postId, {
      $addToSet: {
        saved: { user: userId },
      },
    });
    post.savedCount = post.saved.length;
    await post.save();
  }
  async getAllSaved(query: { page?: string; limit?: string }, id: string) {
    const post = await this.PostModel.findById(id)
      .populate('saved.user')
      .select('saved');
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    return this.paginationArray.apiPagination(query, post.saved);
  }
  async deleteSaved(postId: string, userId: string) {
    const post = await this.PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { saved: { user: userId } },
      },
      { new: true },
    );
    post.savedCount = post.saved.length;
    await post.save();
  }
}
