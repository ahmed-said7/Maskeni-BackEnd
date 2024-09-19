import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/reaction/dto/comment.create.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { Share, ShareDocument } from './share.schema';
import { CreateShareDto } from './dto/create.share.dto';
import { UpdateShareDto } from './dto/update.share.dto';
import { QueryShareDto } from './dto/query.share.dto';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel(Share.name) private shareModel: Model<ShareDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private reactionService: ReactionService<ShareDocument>,
    private apiService: ApiService<ShareDocument, FindQuery>,
  ) {}
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
    if (shareExists.user.toString() != user.toString()) {
      throw new HttpException('you are not allowed to delete share', 400);
    }
    shareExists.isDeleted = true;
    await shareExists.save();
    return { status: 'deleted' };
  }
  async getShare(shareId: string) {
    const shareExists = await this.shareModel
      .findById(shareId)
      .populate('user');
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
    const events = await query.populate('user');
    return { events, pagination: paginationObj };
  }
  async addLike(shareId: string, user: string) {
    const post = await this.shareModel.findOne({
      _id: shareId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.shareModel)
      .createLike(shareId, user);
    return { status: 'like added' };
  }
  async removeLike(shareId: string, user: string) {
    const post = await this.shareModel.findOne({
      _id: shareId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.shareModel)
      .deleteLike(shareId, user);
    return { status: 'like removed' };
  }
  async getLikes(shareId: string, query: FindQuery) {
    return this.reactionService.getAllLikes(query, shareId);
  }
  async addComment(body: CreateCommentDto, shareId: string, user: string) {
    const post = await this.shareModel.findOne({
      _id: shareId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    body.user = user;
    await this.reactionService.createComment(body, shareId);
    return {
      status: 'comment added',
      comment: body,
    };
  }
  async removeComment(shareId: string, commentId: string, user: string) {
    const post = await this.shareModel.findOne({
      _id: shareId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.shareModel)
      .deleteComment(shareId, commentId, user);
    return { status: 'comment removed' };
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
    await this.reactionService
      .setModel(this.shareModel)
      .createSaved(shareId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { savedShare: { post: shareId } },
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
    await this.reactionService
      .setModel(this.shareModel)
      .deleteSaved(shareId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedShare: { event: shareId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllSaved(shareId: string, query: FindQuery) {
    return this.reactionService.getAllSaved(query, shareId);
  }
}
