import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { User, UserDocument } from 'src/user/user.schema';
import { Share, ShareDocument } from './share.schema';
import { CreateShareDto } from './dto/create.share.dto';
import { UpdateShareDto } from './dto/update.share.dto';
import { QueryShareDto } from './dto/query.share.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { Quarter } from 'src/quarter/quarter.schema';
import { City } from 'src/city/city.schema';
import { Country } from 'src/country/country.schema';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel(Share.name) private shareModel: Model<ShareDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private reactionService: ReactionService<ShareDocument>,
    private apiService: ApiService<ShareDocument, FindQuery>,
  ) {
    this.reactionService.setModel(shareModel);
  }
  async createShare(body: CreateShareDto, user: string) {
    body.user = user;
    const event = await this.shareModel.create(body);
    return { event };
  }
  async updateShare(shareId: string, body: UpdateShareDto, user: string) {
    const shareExists = await this.shareModel.findById(shareId);
    if (!shareExists) {
      throw new HttpException('share not found', 400);
    }
    if (shareExists.user.toString() != user) {
      throw new HttpException('you are not allowed to update share', 400);
    }
    const share = await this.shareModel.findByIdAndUpdate(shareId, body, {
      new: true,
    });
    return { share };
  }
  async deleteShare(shareId: string, user: string) {
    const shareExists = await this.shareModel.findById(shareId);
    if (!shareExists) {
      throw new HttpException('share not found', 400);
    }
    if (shareExists.user.toString() != user) {
      throw new HttpException('you are not allowed to delete share', 400);
    }
    shareExists.isDeleted = true;
    await shareExists.save();
    return { status: 'deleted' };
  }
  async getShare(shareId: string) {
    const shareExists = await this.shareModel
      .findById(shareId)
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
    if (!shareExists) {
      throw new HttpException('share not found', 400);
    }
    return { share: shareExists };
  }
  async getAllShare(obj: QueryShareDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.shareModel.find(),
      obj,
    );
    const shares = await query
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
    return { shares, pagination: paginationObj };
  }
  async addLike(shareId: string, user: string) {
    return this.reactionService.createLike(shareId, user);
  }
  async removeLike(shareId: string, user: string) {
    return this.reactionService.deleteLike(shareId, user);
  }
  async getLikes(shareId: string, query: FindQuery) {
    return this.reactionService.getAllLikes(shareId, query);
  }
  async addComment(body: CreateCommentDto, shareId: string, user: string) {
    const post = await this.shareModel.findOne({
      _id: shareId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    body.user = user;
    body.post = shareId;
    return this.reactionService.createComment(body);
  }
  async removeComment(commentId: string, user: string) {
    return this.reactionService.deleteComment(commentId, user);
  }
  async getComments(shareId: string, query: FindQuery) {
    return this.reactionService.getAllComments(query, shareId);
  }
  async addSaved(shareId: string, user: string) {
    const post = await this.shareModel.findOne({
      _id: shareId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService.createSaved(shareId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { savedShare: { share: shareId, createdAt: new Date() } },
    });
    return { status: 'saved added post' };
  }
  async deleteSaved(shareId: string, user: string) {
    const post = await this.shareModel.findOne({
      _id: shareId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService.deleteSaved(shareId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedShare: { share: shareId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllSaved(shareId: string, query: FindQuery) {
    return this.reactionService.getAllSaved(query, shareId);
  }
  async getMyArcivedShare(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.shareModel.find(),
      obj,
      { isArchived: true, user },
    );
    const events = await query.setOptions({ skipFilter: true });
    return { events, pagination: paginationObj };
  }
  async getMyDeletdShare(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.shareModel.find(),
      obj,
      { isDeleted: true, user },
    );
    const events = await query.setOptions({ skipFilter: true });
    return { events, pagination: paginationObj };
  }
}
