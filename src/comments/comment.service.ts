import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/comment.create.dto';
import { CommentDocument } from './comments.schema';
import { ApiService } from 'src/common/Api/api.service';
import { CommentQueryDto } from './dto/comment.query.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private apiService: ApiService<CommentDocument, CommentQueryDto>,
  ) {}

  // Create a new comment
  async create(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentModel.create(createCommentDto);
    return newComment;
  }

  // Get all comments
  async findAll(obj: CommentQueryDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.commentModel.find(),
      obj,
    );
    const comments = await query;
    return { comments, pagination: paginationObj };
  }

  // Update a comment by its ID
  async update(id: string, userId: string, updateCommentDto: CreateCommentDto) {
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

  // Delete a comment by its ID
  async remove(id: string, userId: string) {
    const result = await this.commentModel.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!result) {
      throw new NotFoundException(`Comment with ID "${id}" not found`);
    }
    return result;
  }
}
