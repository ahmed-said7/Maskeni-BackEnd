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
import { Offered, OfferedDocument } from './offered-service.schema';
import { City } from 'src/city/city.schema';
import { Country } from 'src/country/country.schema';
import { Quarter } from 'src/quarter/quarter.schema';

@Injectable()
export class OfferedService {
  constructor(
    @InjectModel(Offered.name)
    private serviceModel: Model<OfferedDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private reactionService: ReactionService<OfferedDocument>,
    private apiService: ApiService<
      OfferedDocument,
      QueryOfferedDto | FindQuery
    >,
  ) {
    this.reactionService.setModel(this.serviceModel);
  }
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
    if (serviceExists.user.toString() != user) {
      throw new HttpException('you are not allowed to delete service', 400);
    }
    serviceExists.isDeleted = true;
    await serviceExists.save();
    return { status: 'deleted' };
  }
  async getService(serviceId: string, userId: string) {
    const serviceExists = await this.serviceModel
      .findById(serviceId)
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      // .populate({
      //   path: 'comments',
      //   select: '-likes -comments -replies',
      //   populate: { path: 'user', select: 'name mobile icon', model: 'User' },
      //   options: { limit: 1 }, // Only load the first few replies (can increase limit)
      // })
      // .populate({
      //   path: 'likes',
      //   populate: { path: 'user', select: 'name mobile icon', model: 'User' },
      //   options: { limit: 1 }, // Only load the first few replies (can increase limit)
      // })
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
    if (!serviceExists) {
      throw new HttpException('service not found', 400);
    }
    const user = await this.userModel.findById(userId);
    serviceExists.isLiked = user.favoriteService.includes(serviceExists._id);
    serviceExists.isSaved = serviceExists.saved.some(
      (ele) => ele.user.toString() == userId,
    );
    return { service: serviceExists };
  }
  async getAllservices(obj: QueryOfferedDto, userId: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.serviceModel.find(),
      obj,
    );
    let services = await query
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
    const user = await this.userModel.findById(userId);
    services = services.map((service) => {
      service.isLiked = user.favoriteService.includes(service._id);
      service.isSaved = service.saved.some(
        (ele) => ele.user.toString() == userId,
      );
      return service;
    });
    return { services, pagination: paginationObj };
  }
  async addLike(serviceId: string, user: string) {
    const result = await this.reactionService.createLike(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { favoriteService: serviceId },
    });
    return result;
  }
  async removeLike(serviceId: string, user: string) {
    const result = await this.reactionService.deleteLike(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { favoriteService: serviceId },
    });
    return result;
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
    return this.reactionService.deleteComment(commentId, user);
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
    const result = await this.reactionService.createSaved(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: {
        savedservice: { service: serviceId, createdAt: new Date() },
      },
    });
    return result;
  }
  async deleteSaved(serviceId: string, user: string) {
    const service = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!service) {
      throw new HttpException('service not found', 400);
    }
    const result = await this.reactionService.deleteSaved(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedService: { service: serviceId } },
    });
    return result;
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
    const result = await this.reactionService.createRequestedService(
      serviceId,
      user,
    );
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: {
        requestedService: { service: serviceId, createdAt: new Date() },
      },
    });
    return result;
  }
  async deleteRequested(serviceId: string, user: string) {
    const post = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    const result = await this.reactionService.deleteRequestedService(
      serviceId,
      user,
    );
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { requestedService: { service: serviceId } },
    });
    return result;
  }
  async getAllRequested(serviceId: string, query: FindQuery) {
    return this.reactionService.getAllRequestedServices(query, serviceId);
  }
  async getMyArchivedServices(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.serviceModel.find(),
      obj,
      { isArchived: true, user },
    );
    const services = await query
      .setOptions({ skipFilter: true })
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
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
    return { services, pagination: paginationObj };
  }
  async getMyDeletedServices(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.serviceModel.find(),
      obj,
      { isDeleted: true, user },
    );
    const services = await query
      .setOptions({ skipFilter: true })
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
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
    return { services, pagination: paginationObj };
  }
}
