import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './ticket.schema';
import { ApiService } from 'src/common/Api/api.service';
import { QueryTicketDto } from './dto/query.ticket.dto';
import { EventDocument } from 'src/event/event.schema';
export declare class TicketService {
  private ticketModel;
  private eventModel;
  private apiService;
  constructor(
    ticketModel: Model<TicketDocument>,
    eventModel: Model<EventDocument>,
    apiService: ApiService<TicketDocument, QueryTicketDto>,
  );
  getTicket(ticketId: string): Promise<{
    ticket: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, Ticket> &
        Ticket & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, Ticket> &
      Ticket & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  getTickets(
    obj: QueryTicketDto,
    user: string,
  ): Promise<{
    posts: (import('mongoose').Document<unknown, {}, Ticket> &
      Ticket & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  createTicket(
    eventId: string,
    quantity: number,
    user: string,
  ): Promise<{
    ticket: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, Ticket> &
        Ticket & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, Ticket> &
      Ticket & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
}
