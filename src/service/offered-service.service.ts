import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { User, UserDocument } from 'src/user/user.schema';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { QueryOfferedDto } from './dto/query.service.dto';
import { CreateOfferedDto } from './dto/create.service.dto';
import { UpdateOfferedDto } from './dto/update.service.dto';
import { OfferedDocument } from './offered-service.schema';

@Injectable()
export class OfferedService {
  constructor(
    @InjectModel(OfferedService.name)
    private serviceModel: Model<OfferedDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private reactionService: ReactionService<OfferedDocument>,
    private apiService: ApiService<OfferedDocument, QueryOfferedDto>,
  ) {}
  async createService(body: CreateOfferedDto, user: string) {
    body.user = user;
    const service = await this.serviceModel.create(body);
    return { service };
  }
  async updateService(serviceId: string, body: UpdateOfferedDto, user: string) {
    const serviceExists = await this.serviceModel.findById(serviceId);
    if (!serviceExists) {
      throw new HttpException('service not found', 400);
    }
    if (serviceExists.user.toString() != user) {
      throw new HttpException('you are not allowed to update service', 400);
    }
    const service = await this.serviceModel.findByIdAndUpdate(serviceId, body, {
      new: true,
    });
    return { service };
  }
  async deleteService(serviceId: string, user: string) {
    const serviceExists = await this.serviceModel.findById(serviceId);
    if (!serviceExists) {
      throw new HttpException('service not found', 400);
    }
    if (serviceExists.user.toString() != user.toString()) {
      throw new HttpException('you are not allowed to delete service', 400);
    }
    serviceExists.isDeleted = true;
    await serviceExists.save();
    return { status: 'deleted' };
  }
  async getService(serviceId: string) {
    const serviceExists = await this.serviceModel
      .findById(serviceId)
      .populate('user');
    if (!serviceExists) {
      throw new HttpException('service not found', 400);
    }
    return { service: serviceExists };
  }
  async getAllservices(obj: QueryOfferedDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.serviceModel.find(),
      obj,
    );
    const services = await query.populate('user');
    return { services, pagination: paginationObj };
  }
  async addLike(serviceId: string, user: string) {
    return this.reactionService
      .setModel(this.serviceModel)
      .createLike(serviceId, user);
  }
  async removeLike(serviceId: string, user: string) {
    return this.reactionService
      .setModel(this.serviceModel)
      .deleteLike(serviceId, user);
  }
  async getLikes(serviceId: string, query: FindQuery) {
    return this.reactionService.getAllLikes(serviceId, query);
  }
  async addComment(body: CreateCommentDto, serviceId: string, user: string) {
    const post = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    body.user = user;
    body.post = serviceId;
    return this.reactionService.createComment(body);
  }
  async removeComment(commentId: string, user: string) {
    return this.reactionService
      .setModel(this.serviceModel)
      .deleteComment(commentId, user);
  }
  async getComments(serviceId: string, query: FindQuery) {
    return this.reactionService.getAllComments(query, serviceId);
  }
  async addSaved(serviceId: string, user: string) {
    const service = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!service) {
      throw new HttpException('service not found', 400);
    }
    await this.reactionService
      .setModel(this.serviceModel)
      .createSaved(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { savedservice: { post: serviceId } },
    });
    return { status: 'saved added post' };
  }
  async deleteSaved(serviceId: string, user: string) {
    const service = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!service) {
      throw new HttpException('service not found', 400);
    }
    await this.reactionService
      .setModel(this.serviceModel)
      .deleteSaved(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedEvent: { event: serviceId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllSaved(serviceId: string, query: FindQuery) {
    return this.reactionService.getAllSaved(query, serviceId);
  }
  async addRequested(serviceId: string, user: string) {
    const post = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.serviceModel)
      .createSaved(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { requestedService: { post: serviceId } },
    });
    return { status: 'saved added post' };
  }
  async deleteRequested(serviceId: string, user: string) {
    const post = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.serviceModel)
      .deleteRequestedService(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { requestedService: { service: serviceId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllRequested(serviceId: string, query: FindQuery) {
    return this.reactionService.getAllRequestedServices(query, serviceId);
  }
}
