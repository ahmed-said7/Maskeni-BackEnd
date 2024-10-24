import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LikesDocument } from './likes.schema';
import { ApiService } from 'src/common/Api/api.service';
import { LikeDto } from './dto/create.likes.dto';
import { LikesQueryDto } from './dto/query.likes.dto';
import { CommentDocument } from 'src/comment/comment.schema';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel('Likes') private likesModel: Model<LikesDocument>,
    @InjectModel('Comment') private commentModel: Model<CommentDocument>,
    private apiService: ApiService<LikesDocument, LikesQueryDto>,
  ) {}
  // Add a new like, but ensure the user hasn't liked the post before
  async addLikeToPost(likeDto: LikeDto) {
    const { user, post } = likeDto;
    const existingLike = await this.likesModel.findOne({ user, post });
    if (existingLike) {
      throw new BadRequestException('User already liked this post');
    }
    // Create and save the like
    const newLike = await this.likesModel.create(likeDto);
    return newLike;
  }
  async isLiked(user: string, post: string) {
    const existingLike = await this.likesModel.findOne({ user, post });
    return !!existingLike;
  }
  // Remove a like, but ensure the user has liked the post before
  async removeLikeFromPost(likeDto: LikeDto) {
    const { user, post } = likeDto;
    // Check if the user has liked the post
    const like = await this.likesModel.findOneAndDelete({ user, post });
    if (!like) {
      throw new NotFoundException('User has not liked this post');
    }
    return like;
  }
  async addlikeToComment(comment: string, user: string) {
    let like = await this.likesModel.findOne({ user, comment });
    if (like) {
      return { status: 'like add before' };
    }
    like = await this.likesModel.create({ user, comment });
    await this.commentModel.findByIdAndUpdate(comment, {
      $addToSet: { likes: like._id },
      $inc: { likesCount: 1 },
    });
    return { status: 'like added' };
  }
  async removeikeFromComment(comment: string, user: string) {
    const like = await this.likesModel.findOneAndDelete({ user, comment });
    if (!like) {
      return { status: 'you do not have added like before' };
    }
    await this.commentModel.findByIdAndUpdate(comment, {
      $pull: { likes: like._id },
      $inc: { likesCount: -1 },
    });
    return { status: 'like removed' };
  }
  async getCommentLikes(commentId: string, obj: LikesQueryDto) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.likesModel.find(),
      obj,
      { _id: { $in: comment.likes } },
    );
    const likes = await query.populate({
      path: 'user',
      model: 'User',
      select: 'name mobile icon',
    });
    return { likes, pagination: paginationObj };
  }
  // Get all likes for a specific post
  async getPostLikes(ids: any[], obj: LikesQueryDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.likesModel.find(),
      obj,
      { _id: { $in: ids } },
    );
    const likes = await query.populate({
      path: 'user',
      model: 'User',
      select: 'name mobile icon',
    });
    return { likes, pagination: paginationObj };
  }
}
