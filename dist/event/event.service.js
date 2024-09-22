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
exports.EventService = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const api_service_1 = require('../common/Api/api.service');
const reaction_service_1 = require('../reaction/reaction.service');
const user_schema_1 = require('../user/user.schema');
const ticket_schema_1 = require('../ticket/ticket.schema');
let EventService = class EventService {
  constructor(eventModel, userModel, ticketModel, reactionService, apiService) {
    this.eventModel = eventModel;
    this.userModel = userModel;
    this.ticketModel = ticketModel;
    this.reactionService = reactionService;
    this.apiService = apiService;
    this.reactionService.setModel(eventModel);
  }
  async createEvent(body, user) {
    body.user = user;
    if (!body.date) {
      const date = new Date(body.startedAt);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      body.date = new Date(year, month, day).toISOString();
    }
    const event = await this.eventModel.create(body);
    return { event };
  }
  async updateEvent(eventId, body, user) {
    const eventExists = await this.eventModel.findById(eventId);
    if (!eventExists) {
      throw new common_1.HttpException('event not found', 400);
    }
    if (eventExists.user.toString() != user) {
      throw new common_1.HttpException(
        'you are not allowed to update event',
        400,
      );
    }
    const event = await this.eventModel.findByIdAndUpdate(eventId, body, {
      new: true,
    });
    return { event };
  }
  async deleteEvent(eventId, user) {
    const eventExists = await this.eventModel.findById(eventId);
    if (!eventExists) {
      throw new common_1.HttpException('event not found', 400);
    }
    if (eventExists.user.toString() != user) {
      throw new common_1.HttpException(
        'you are not allowed to delete event',
        400,
      );
    }
    eventExists.isDeleted = true;
    await eventExists.save();
    return { status: 'deleted' };
  }
  async getEvent(eventId) {
    const eventExists = await this.eventModel
      .findById(eventId)
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
    if (!eventExists) {
      throw new common_1.HttpException('event not found', 400);
    }
    return { event: eventExists };
  }
  async getAllEvents(obj) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
      obj,
    );
    const events = await query
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
    return { events, pagination: paginationObj };
  }
  async getAllPreviousReservedEvents(obj, user) {
    const tickets = await this.ticketModel.find({ user });
    const ids = tickets.map(({ event }) => event.toString());
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
      obj,
      { _id: { $in: ids }, endedAt: { $lt: new Date() } },
    );
    const events = await query
      .populate({ path: 'user', select: 'name mobile icon' })
      .select('-comments -likes -saved');
    return { events, pagination: paginationObj };
  }
  async getAllFutureEvents(obj, user) {
    const tickets = await this.ticketModel.find({ user });
    const ids = tickets.map(({ event }) => event.toString());
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
      obj,
      { _id: { $in: ids }, endedAt: { $gt: new Date() } },
    );
    const events = await query
      .populate({ path: 'user', select: 'name mobile icon' })
      .select('-comments -likes -saved');
    return { events, pagination: paginationObj };
  }
  async addLike(eventId, user) {
    return this.reactionService.createLike(eventId, user);
  }
  async removeLike(eventId, user) {
    return this.reactionService.deleteLike(eventId, user);
  }
  async getLikes(eventId, query) {
    return this.reactionService.getAllLikes(eventId, query);
  }
  async addComment(body, eventId, user) {
    const post = await this.eventModel.findOne({
      _id: eventId,
    });
    if (!post) {
      throw new common_1.HttpException('post not found', 400);
    }
    body.user = user;
    body.post = eventId;
    return this.reactionService.createComment(body);
  }
  async removeComment(commentId, user) {
    return this.reactionService.deleteComment(commentId, user);
  }
  async getComments(eventId, query) {
    return this.reactionService.getAllComments(query, eventId);
  }
  async addSaved(eventId, user) {
    const post = await this.eventModel.findOne({
      _id: eventId,
    });
    if (!post) {
      throw new common_1.HttpException('post not found', 400);
    }
    await this.reactionService.createSaved(eventId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { savedEvent: { event: eventId } },
    });
    return { status: 'saved added post' };
  }
  async deleteSaved(eventId, user) {
    const event = await this.eventModel.findOne({
      _id: eventId,
    });
    if (!event) {
      throw new common_1.HttpException('event not found', 400);
    }
    await this.reactionService.deleteSaved(eventId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedEvent: { event: eventId } },
    });
    return { status: 'saved deleted event' };
  }
  async getAllSaved(eventId, query) {
    return this.reactionService.getAllSaved(query, eventId);
  }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Event.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(ticket_schema_1.Ticket.name)),
    __metadata('design:paramtypes', [
      mongoose_2.Model,
      mongoose_2.Model,
      mongoose_2.Model,
      reaction_service_1.ReactionService,
      api_service_1.ApiService,
    ]),
  ],
  EventService,
);
//# sourceMappingURL=event.service.js.map
