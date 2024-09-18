import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/reaction/dto/comment.create.dto';
import { User, UserDocument } from 'src/user/user.schema';
import { EventDocument } from './event.schema';
import { QueryEventDto } from './dto/query.event.dto';
import { CreateEventDto } from './dto/create.event.dto';
import { UpdateEventDto } from './dto/update.event.dto';
import { Ticket, TicketDocument } from 'src/ticket/ticket.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    private reactionService: ReactionService<EventDocument>,
    private apiService: ApiService<EventDocument, QueryEventDto>,
  ) {}
  async createEvent(body: CreateEventDto, user: string) {
    body.user = user;
    const event = await this.eventModel.create(body);
    return { event };
  }
  async updateEvent(eventId: string, body: UpdateEventDto, user: string) {
    const eventExists = await this.eventModel.findById(eventId);
    if (!eventExists) {
      throw new HttpException('event not found', 400);
    }
    if (eventExists.user.toString() != user) {
      throw new HttpException('you are not allowed to update event', 400);
    }
    const event = await this.eventModel.findByIdAndUpdate(eventId, body, {
      new: true,
    });
    return { event };
  }
  async deleteEvent(eventId: string, user: string) {
    const eventExists = await this.eventModel.findById(eventId);
    if (!eventExists) {
      throw new HttpException('event not found', 400);
    }
    if (eventExists.user.toString() != user.toString()) {
      throw new HttpException('you are not allowed to delete event', 400);
    }
    eventExists.isDeleted = true;
    await eventExists.save();
    return { status: 'deleted' };
  }
  async getEvent(eventId: string) {
    const eventExists = await this.eventModel
      .findById(eventId)
      .populate('user');
    if (!eventExists) {
      throw new HttpException('event not found', 400);
    }
    return { event: eventExists };
  }
  async getAllEvents(obj: QueryEventDto) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
      obj,
    );
    const events = await query.populate('user');
    return { events, pagination: paginationObj };
  }
  async getAllPreviousReservedEvents(obj: QueryEventDto, user: string) {
    const tickets = await this.ticketModel.find({ user }).populate('event');
    const ids = tickets.map(({ event }) => event.toString());
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
      obj,
      { _id: { $in: ids }, endedAt: { $lt: new Date() } },
    );
    const events = await query.populate('user');
    return { events, pagination: paginationObj };
  }
  async getAllFutureEvents(obj: QueryEventDto, user: string) {
    const tickets = await this.ticketModel.find({ user }).populate('event');
    const ids = tickets.map(({ event }) => event.toString());
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.eventModel.find(),
      obj,
      { _id: { $in: ids }, endedAt: { $gt: new Date() } },
    );
    const events = await query.populate('user');
    return { events, pagination: paginationObj };
  }
  async addLike(eventId: string, user: string) {
    const post = await this.eventModel.findOne({
      _id: eventId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.eventModel)
      .createLike(eventId, user);
    return { status: 'like added' };
  }
  async removeLike(eventId: string, user: string) {
    const post = await this.eventModel.findOne({
      _id: eventId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.eventModel)
      .deleteLike(eventId, user);
    return { status: 'like removed' };
  }
  async getLikes(eventId: string, query: FindQuery) {
    return this.reactionService.getAllLikes(query, eventId);
  }
  async addComment(body: CreateCommentDto, eventId: string, user: string) {
    const post = await this.eventModel.findOne({
      _id: eventId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    body.user = user;
    await this.reactionService.createComment(body, eventId);
    return {
      status: 'comment added',
      comment: body,
    };
  }
  async removeComment(eventId: string, commentId: string, user: string) {
    const post = await this.eventModel.findOne({
      _id: eventId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.eventModel)
      .deleteComment(eventId, commentId, user);
    return { status: 'comment removed' };
  }
  async getComments(eventId: string, user: string, query: FindQuery) {
    return this.reactionService.getAllComments(query, eventId);
  }
  async addSaved(eventId: string, user: string) {
    const post = await this.eventModel.findOne({
      _id: eventId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.eventModel)
      .createSaved(eventId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $addToSet: { savedGroupPost: { post: eventId } },
    });
    return { status: 'saved added post' };
  }
  async deleteSaved(eventId: string, user: string) {
    const post = await this.eventModel.findOne({
      _id: eventId,
    });
    if (!post) {
      throw new HttpException('post not found', 400);
    }
    await this.reactionService
      .setModel(this.eventModel)
      .deleteSaved(eventId, user);
    await this.userModel.findByIdAndUpdate(user, {
      $pull: { savedEvents: { event: eventId } },
    });
    return { status: 'saved deleted post' };
  }
  async getAllSaved(eventId: string, user: string, query: FindQuery) {
    return this.reactionService.getAllSaved(query, eventId);
  }
}
