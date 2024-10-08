import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './ticket.schema';
import { ApiService } from 'src/common/Api/api.service';
import { QueryTicketDto } from './dto/query.ticket.dto';
import { EventDocument } from 'src/event/event.schema';
import * as QRCode from 'qrcode';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    private apiService: ApiService<TicketDocument, QueryTicketDto>,
  ) {}
  async getTicket(ticketId: string) {
    const ticketExists = await this.ticketModel
      .findById(ticketId)
      .populate({ path: 'user', select: 'name mobile icon', model: 'User' })
      .populate({
        path: 'eventOwner',
        select: 'name mobile icon',
        model: 'User',
      })
      .populate({
        path: 'event',
        select: 'name details images type',
        model: Event.name,
      });
    if (!ticketExists) {
      throw new HttpException('ticket not found', 400);
    }
    return { ticket: ticketExists };
  }
  async getTickets(obj: QueryTicketDto, user: string) {
    const filter = { $or: [{ eventOwner: user }, { user }] };
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.ticketModel.find(),
      obj,
      filter,
    );
    const posts = await query
      .populate({ path: 'user', select: 'name mobile icon', model: 'User' })
      .populate({
        path: 'eventOwner',
        select: 'name mobile icon',
        model: 'User',
      })
      .populate({
        path: 'event',
        select: 'name details images type',
        model: Event.name,
      });
    return { posts, pagination: paginationObj };
  }
  async createTicket(eventId: string, quantity: number, user: string) {
    const event = await this.eventModel.findById(eventId);
    if (!event) {
      throw new HttpException('event not found', 400);
    }
    const ticket = await this.ticketModel.create({
      price: event.price,
      user: user,
      eventOwner: event.user.toString(),
      event: event._id.toString(),
      isPaid: false,
      quantity,
    });
    const qrCodeUrl = await QRCode.toDataURL(
      JSON.stringify({
        ticketId: ticket._id.toString(),
        user,
        expiresAt: new Date(event.endedAt.getTime() + 3600 * 3000),
      }),
    );
    ticket.qrCode = qrCodeUrl;
    await ticket.save();
    return { ticket };
  }
}
