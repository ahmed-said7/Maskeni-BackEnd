import { TicketService } from './ticket.service';
import { QueryTicketDto } from './dto/query.ticket.dto';
export declare class TicketController {
  private ticketService;
  constructor(ticketService: TicketService);
  getTicket(ticketId: string): Promise<{
    ticket: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./ticket.schema').Ticket
      > &
        import('./ticket.schema').Ticket & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./ticket.schema').Ticket
      > &
      import('./ticket.schema').Ticket & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  getAllTickets(
    query: QueryTicketDto,
    req: any,
  ): Promise<{
    posts: (import('mongoose').Document<
      unknown,
      {},
      import('./ticket.schema').Ticket
    > &
      import('./ticket.schema').Ticket & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('../common/Api/api.service').Pagination;
  }>;
  create(
    ticketId: string,
    req: any,
    quantity: number,
  ): Promise<{
    ticket: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./ticket.schema').Ticket
      > &
        import('./ticket.schema').Ticket & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./ticket.schema').Ticket
      > &
      import('./ticket.schema').Ticket & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
}
