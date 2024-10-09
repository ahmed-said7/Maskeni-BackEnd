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
import { Country } from 'src/country/country.schema';
import { City } from 'src/city/city.schema';
import { Quarter } from 'src/quarter/quarter.schema';

@Injectable()
export class VoluntaryService {
  constructor(
    @InjectModel(Voluntary.name)
    private voluntaryModel: Model<VoluntaryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private reactionService: ReactionService<VoluntaryDocument>,
    private apiService: ApiService<
      VoluntaryDocument,
      QueryVoluntaryDto | FindQuery
    >,
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
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'country',
        select: 'image nameAr nameEn',
        model: Country.name,
      })
      .populate({
        path: 'city',
        select: 'image nameAr nameEn',
        model: City.name,
      })
      .populate({
        path: 'quarter',
        select: 'image nameAr nameEn',
        model: Quarter.name,
      });
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
    const voluntary = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'likes',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 }, // Only load the first few replies (can increase limit)
      })
      .populate({
        path: 'country',
        select: 'image nameAr nameEn',
        model: Country.name,
      })
      .populate({
        path: 'city',
        select: 'image nameAr nameEn',
        model: City.name,
      })
      .populate({
        path: 'quarter',
        select: 'image nameAr nameEn',
        model: Quarter.name,
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
    const result = await this.reactionService.createLike(voluntaryId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { favoriteVoluntary: voluntaryId },
    });
    return result;
  }
  async removeLike(voluntaryId: string, user: string) {
    const post = await this.voluntaryModel.findOne({
      _id: voluntaryId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const result = await this.reactionService.deleteLike(voluntaryId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { favoriteVoluntary: voluntaryId },
    });
    return result;
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
      $addToSet: {
        savedVoluntary: { voluntary: voluntaryId, createdAt: new Date() },
      },
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
    await this.reactionService.deleteSaved(voluntaryId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedVoluntary: { voluntary: voluntaryId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllSaved(voluntaryId: string, query: FindQuery) {
    return this.reactionService.getAllSaved(query, voluntaryId);
  }
  async getMyDeletedVoluntary(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.voluntaryModel.find(),
      obj,
      { isDeleted: true, user },
    );
    const voluntary = await query.setOptions({ skipFilter: true });
    return { voluntary, pagination: paginationObj };
  }
  async getMyArchivedVoluntary(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.voluntaryModel.find(),
      obj,
      { isArchived: true, user },
    );
    const voluntary = await query.setOptions({ skipFilter: true });
    return { voluntary, pagination: paginationObj };
  }
}
