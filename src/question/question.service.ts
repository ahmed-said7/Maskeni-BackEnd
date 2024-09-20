import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { User, UserDocument } from 'src/user/user.schema';
import { Question, QuestionDocument } from './question.schema';
import { CreateShareDto } from 'src/share/dto/create.share.dto';
import { UpdateQuestionDto } from './dto/update.question.dto';
import { QueryQuestionDto } from './dto/query.question.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private reactionService: ReactionService<QuestionDocument>,
    private apiService: ApiService<QuestionDocument, FindQuery>,
  ) {}
  async createQuestion(body: CreateShareDto, user: string) {
    body.user = user;
    const question = await this.questionModel.create(body);
    return { question };
  }
  async updateQuestion(
    questionId: string,
    body: UpdateQuestionDto,
    user: string,
  ) {
    const questionExists = await this.questionModel.findById(questionId);
    if (!questionExists) {
      throw new HttpException('question not found', 400);
    }
    if (questionExists.user.toString() != user) {
      throw new HttpException('you are not allowed to update question', 400);
    }
    const question = await this.questionModel.findByIdAndUpdate(
      questionId,
      body,
      {
        new: true,
      },
    );
    return { question };
  }
  async deleteQuestion(questionId: string, user: string) {
    const questionExists = await this.questionModel.findById(questionId);
    if (!questionExists) {
      throw new HttpException('question not found', 400);
    }
    if (questionExists.user.toString() != user.toString()) {
      throw new HttpException('you are not allowed to delete question', 400);
    }
    questionExists.isDeleted = true;
    await questionExists.save();
    return { status: 'deleted' };
  }
  async getQuestion(questionId: string) {
    const questionExists = await this.questionModel
      .findById(questionId)
      .populate('user');
    if (!questionExists) {
      throw new HttpException('question not found', 400);
    }
    return { question: questionExists };
  }
  async getAllQuestion(obj: QueryQuestionDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.questionModel.find(),
      obj,
    );
    const questions = await query.populate('user');
    return { questions, pagination: paginationObj };
  }
  async addLike(questionId: string, user: string) {
    return this.reactionService
      .setModel(this.questionModel)
      .createLike(questionId, user);
    return { status: 'like added' };
  }
  async removeLike(questionId: string, user: string) {
    return this.reactionService
      .setModel(this.questionModel)
      .deleteLike(questionId, user);
    return { status: 'like removed' };
  }
  async getLikes(questionId: string, query: FindQuery) {
    return this.reactionService.getAllLikes(questionId, query);
  }
  async addComment(body: CreateCommentDto, questionId: string, user: string) {
    const post = await this.questionModel.findOne({
      _id: questionId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    body.user = user;
    body.post = questionId;
    return this.reactionService.createComment(body);
  }
  async removeComment(commentId: string, user: string) {
    return this.reactionService
      .setModel(this.questionModel)
      .deleteComment(commentId, user);
  }
  async getComments(questionId: string, query: FindQuery) {
    return this.reactionService.getAllComments(query, questionId);
  }
  async addSaved(questionId: string, user: string) {
    const post = await this.questionModel.findOne({
      _id: questionId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.questionModel)
      .createSaved(questionId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { savedQuestion: { post: questionId } },
    });
    return { status: 'saved added post' };
  }
  async deleteSaved(questionId: string, user: string) {
    const post = await this.questionModel.findOne({
      _id: questionId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.questionModel)
      .deleteSaved(questionId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedQuestion: { question: questionId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllSaved(questionId: string, query: FindQuery) {
    return this.reactionService.getAllSaved(query, questionId);
  }
}
