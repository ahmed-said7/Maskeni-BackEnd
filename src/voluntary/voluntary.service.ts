import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { User, UserDocument } from 'src/user/user.schema';
import { QueryVoluntaryDto } from './dto/voluntary.query.dto';
import { CreateVoluntaryDto } from './dto/voluntary.create.dto';
import { UpdateVoluntaryDto } from './dto/voluntary.update.dto';
import { Voluntary, VoluntaryDocument } from './voluntary.schema';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';

@Injectable()
export class VoluntaryService {
  constructor(
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private reactionService: ReactionService<VoluntaryDocument>,
    private apiService: ApiService<VoluntaryDocument, QueryVoluntaryDto>,
  ) {
    this.reactionService.setModel(voluntaryModel);
  }
  async createVoluntary(body: CreateVoluntaryDto, user: string) {
    body.user = user;
    if (!body.date) {
      const date = new Date(body.startedAt);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      body.date = new Date(year, month, day).toISOString();
    }
    const voluntary = await this.voluntaryModel.create(body);
    return { voluntary };
  }
  async updateVoluntary(
    voluntaryId: string,
    body: UpdateVoluntaryDto,
    user: string,
  ) {
    const voluntaryExists = await this.voluntaryModel.findById(voluntaryId);
    if (!voluntaryExists) {
      throw new HttpException('voluntary not found', 400);
    }
    if (voluntaryExists.user.toString() != user) {
      throw new HttpException('you are not allowed to update voluntary', 400);
    }
    const voluntary = await this.voluntaryModel.findByIdAndUpdate(
      voluntaryId,
      body,
      {
        new: true,
      },
    );
    return { voluntary };
  }
  async deleteVoluntary(voluntaryId: string, user: string) {
    const voluntaryExists = await this.voluntaryModel.findById(voluntaryId);
    if (!voluntaryExists) {
      throw new HttpException('voluntary not found', 400);
    }
    if (voluntaryExists.user.toString() != user) {
      throw new HttpException('you are not allowed to delete voluntary', 400);
    }
    voluntaryExists.isDeleted = true;
    await voluntaryExists.save();
    return { status: 'deleted' };
  }
  async getVoluntary(voluntaryId: string) {
    const voluntaryExists = await this.voluntaryModel
      .findById(voluntaryId)
      .populate('user');
    if (!voluntaryExists) {
      throw new HttpException('voluntary not found', 400);
    }
    return { voluntary: voluntaryExists };
  }
  async getAllVoluntary(obj: QueryVoluntaryDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.voluntaryModel.find(),
      obj,
    );
    const voluntary = await query.populate({
      path: 'user',
      model: 'User',
      select: 'mobile name icon',
    });
    return { voluntary, pagination: paginationObj };
  }
  async addLike(voluntaryId: string, user: string) {
    const post = await this.voluntaryModel.findOne({
      _id: voluntaryId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    return this.reactionService.createLike(voluntaryId, user);
  }
  async removeLike(voluntaryId: string, user: string) {
    const post = await this.voluntaryModel.findOne({
      _id: voluntaryId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    return this.reactionService.deleteLike(voluntaryId, user);
  }
  async getLikes(voluntaryId: string, query: FindQuery) {
    return this.reactionService.getAllLikes(voluntaryId, query);
  }
  async addComment(body: CreateCommentDto, voluntaryId: string, user: string) {
    const post = await this.voluntaryModel.findOne({
      _id: voluntaryId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    body.user = user;
    body.post = voluntaryId;
    return this.reactionService.createComment(body);
  }
  async removeComment(commentId: string, user: string) {
    return this.reactionService.deleteComment(commentId, user);
  }
  async getComments(voluntaryId: string, query: FindQuery) {
    return this.reactionService.getAllComments(query, voluntaryId);
  }
  async addSaved(voluntaryId: string, user: string) {
    const post = await this.voluntaryModel.findOne({
      _id: voluntaryId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService.createSaved(voluntaryId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { savedVoluntary: { voluntary: voluntaryId } },
    });
    return { status: 'saved added post' };
  }
  async deleteSaved(voluntaryId: string, user: string) {
    const post = await this.voluntaryModel.findOne({
      _id: voluntaryId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.voluntaryModel)
      .deleteSaved(voluntaryId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedVoluntary: { voluntary: voluntaryId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllSaved(voluntaryId: string, query: FindQuery) {
    return this.reactionService.getAllSaved(query, voluntaryId);
  }
}
