'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OfferedService = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const api_service_1 = require('../common/Api/api.service');
const reaction_service_1 = require('../reaction/reaction.service');
const user_schema_1 = require('../user/user.schema');
const offered_service_schema_1 = require('./offered-service.schema');
let OfferedService = class OfferedService {
  constructor(serviceModel, userModel, reactionService, apiService) {
    this.serviceModel = serviceModel;
    this.userModel = userModel;
    this.reactionService = reactionService;
    this.apiService = apiService;
    this.reactionService.setModel(this.serviceModel);
  }
  async createService(body, user) {
    body.user = user;
    const service = await this.serviceModel.create(body);
    return { service };
  }
  async updateService(serviceId, body, user) {
    const serviceExists = await this.serviceModel.findById(serviceId);
    if (!serviceExists) {
      throw new common_1.HttpException('service not found', 400);
    }
    if (serviceExists.user.toString() != user) {
      throw new common_1.HttpException(
        'you are not allowed to update service',
        400,
      );
    }
    const service = await this.serviceModel.findByIdAndUpdate(serviceId, body, {
      new: true,
    });
    return { service };
  }
  async deleteService(serviceId, user) {
    const serviceExists = await this.serviceModel.findById(serviceId);
    if (!serviceExists) {
      throw new common_1.HttpException('service not found', 400);
    }
    if (serviceExists.user.toString() != user) {
      throw new common_1.HttpException(
        'you are not allowed to delete service',
        400,
      );
    }
    serviceExists.isDeleted = true;
    await serviceExists.save();
    return { status: 'deleted' };
  }
  async getService(serviceId) {
    const serviceExists = await this.serviceModel
      .findById(serviceId)
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 },
      });
    if (!serviceExists) {
      throw new common_1.HttpException('service not found', 400);
    }
    return { service: serviceExists };
  }
  async getAllservices(obj) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.serviceModel.find(),
      obj,
    );
    const services = await query
      .populate({
        path: 'user',
        model: 'User',
        select: 'mobile name icon',
      })
      .populate({
        path: 'comments',
        select: '-likes -comments -replies',
        populate: { path: 'user', select: 'name mobile icon', model: 'User' },
        options: { limit: 1 },
      });
    return { services, pagination: paginationObj };
  }
  async addLike(serviceId, user) {
    return this.reactionService.createLike(serviceId, user);
  }
  async removeLike(serviceId, user) {
    return this.reactionService.deleteLike(serviceId, user);
  }
  async getLikes(serviceId, query) {
    return this.reactionService.getAllLikes(serviceId, query);
  }
  async addComment(body, serviceId, user) {
    const post = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!post) {
      throw new common_1.HttpException('post not found', 400);
    }
    body.user = user;
    body.post = serviceId;
    return this.reactionService.createComment(body);
  }
  async removeComment(commentId, user) {
    return this.reactionService.deleteComment(commentId, user);
  }
  async getComments(serviceId, query) {
    return this.reactionService.getAllComments(query, serviceId);
  }
  async addSaved(serviceId, user) {
    const service = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!service) {
      throw new common_1.HttpException('service not found', 400);
    }
    await this.reactionService.createSaved(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: {
        savedservice: { service: serviceId, createdAt: new Date() },
      },
    });
    return { status: 'saved added post' };
  }
  async deleteSaved(serviceId, user) {
    const service = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!service) {
      throw new common_1.HttpException('service not found', 400);
    }
    await this.reactionService.deleteSaved(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedService: { service: serviceId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllSaved(serviceId, query) {
    return this.reactionService.getAllSaved(query, serviceId);
  }
  async addRequested(serviceId, user) {
    const post = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!post) {
      throw new common_1.HttpException('post not found', 400);
    }
    await this.reactionService.createRequestedService(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: {
        requestedService: { service: serviceId, createdAt: new Date() },
      },
    });
    return { status: 'saved added post' };
  }
  async deleteRequested(serviceId, user) {
    const post = await this.serviceModel.findOne({
      _id: serviceId,
    });
    if (!post) {
      throw new common_1.HttpException('post not found', 400);
    }
    await this.reactionService.deleteRequestedService(serviceId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { requestedService: { service: serviceId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllRequested(serviceId, query) {
    return this.reactionService.getAllRequestedServices(query, serviceId);
  }
};
exports.OfferedService = OfferedService;
exports.OfferedService = OfferedService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(
      0,
      (0, mongoose_1.InjectModel)(offered_service_schema_1.Offered.name),
    ),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata('design:paramtypes', [
      mongoose_2.Model,
      mongoose_2.Model,
      reaction_service_1.ReactionService,
      api_service_1.ApiService,
    ]),
  ],
  OfferedService,
);
//# sourceMappingURL=offered-service.service.js.map
