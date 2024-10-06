import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { CommentDocument } from './comment.schema';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { CommentQueryDto } from './dto/query.comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Comment') private commentModel: Model<CommentDocument>,
    private apiService: ApiService<CommentDocument, CommentQueryDto>,
  ) {}
  // Create a new comment
  async create(body: CreateCommentDto) {
    if (body.parentComment) {
      const comment = await this.commentModel.findOne({
        post: body.post,
        _id: body.parentComment,
      });
      if (!comment) {
        throw new NotFoundException(
          `Parent comment with ID "${body.parentComment}" not found`,
        );
      }
    }
    const newComment = await this.commentModel.create(body);
    if (newComment.parentComment) {
      await this.commentModel.findByIdAndUpdate(
        body.parentComment,
        {
          $addToSet: { replies: newComment._id },
          $inc: { repliesCount: 1 },
        },
        { new: true },
      );
    }
    return newComment;
  }
  // Get all comments
  // async findAll(obj: any) {
  //   const { query, paginationObj } = await this.apiService.getAllDocs(
  //     this.commentModel.find(),
  //     obj,
  //   );
  //   const comments = await query.populate({
  //     path: 'user',
  //     select: 'name mobile icon',
  //     model: 'User',
  //   });
  //   return { comments, pagination: paginationObj };
  // }
  // Update a comment by its ID
  async update(id: string, userId: string, updateCommentDto: UpdateCommentDto) {
    const result = await this.commentModel.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      updateCommentDto,
    );
    if (!result) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return result;
  }
  async getOne(id: string) {
    const result = await this.commentModel.findById(id);
    if (!result) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return result;
  }
  // Delete a comment by its ID
  async remove(id: string) {
    const comment = await this.commentModel.findOneAndDelete({
      _id: id,
    });
    if (comment.parentComment) {
      await this.commentModel.findByIdAndUpdate(comment.parentComment, {
        $pull: { replies: comment._id },
        $inc: { repliesCount: -1 },
      });
    }
    return comment;
  }
  private async getComments(ids: any[], obj: CommentQueryDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.commentModel.find(),
      obj,
      { _id: { $in: ids } },
    );
    const comments = await query
      .populate({
        path: 'replies',
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
      })
      .populate({
        path: 'user',
        select: 'name mobile icon',
        model: 'User',
      });
    return { comments, pagination: paginationObj };
  }
  async getCommentsReplies(commentId: string, obj: CommentQueryDto) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${commentId}" not found`);
    }
    return this.getComments(comment.replies, obj);
  }
  async getPostComments(ids: any[], obj: CommentQueryDto) {
    return this.getComments(ids, obj);
  }
}
