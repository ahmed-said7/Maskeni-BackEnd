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
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private apiService: ApiService<CommentDocument, CommentQueryDto>,
  ) {}
  // Create a new comment
  async create(body: CreateCommentDto) {
    const newComment = await this.commentModel.create(body);
    if (newComment.parentComment) {
      await this.commentModel.findByIdAndUpdate(body.parentComment, {
        $addToSet: { replies: newComment.parentComment },
        $inc: { replyCount: 1 },
      });
    }
    return newComment;
  }
  // Get all comments
  async findAll(obj: any) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.commentModel.find(),
      obj,
    );
    const comments = await query;
    return { comments, pagination: paginationObj };
  }
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
        $pull: { replies: comment.parentComment },
        $inc: { replyCount: -1 },
      });
    }
    return comment;
  }
  private async getComments(ids: string[], obj: CommentQueryDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.commentModel.find(),
      obj,
      { _id: { $in: ids } },
    );
    const comments = await query.populate({
      path: 'replies',
      options: { limit: 3 }, // Only load the first few replies (can increase limit)
    });
    return { comments, pagination: paginationObj };
  }
  async getCommentsReplies(commentId: string, obj: CommentQueryDto) {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException(`Comment with ID "${commentId}" not found`);
    }
    const ids = comment.replies.map((reply) => reply.toString());
    return this.getComments(ids, obj);
  }
  async getPostComments(ids: any[], obj: CommentQueryDto) {
    return this.getComments(ids, obj);
  }
}