import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { UserDocument } from 'src/user/user.schema';
import { EventDocument } from './event.schema';
import { QueryEventDto } from './dto/query.event.dto';
import { CreateEventDto } from './dto/create.event.dto';
import { UpdateEventDto } from './dto/update.event.dto';
import { TicketDocument } from 'src/ticket/ticket.schema';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
export declare class EventService {
  private eventModel;
  private userModel;
  private ticketModel;
  private reactionService;
  private apiService;
  constructor(
    eventModel: Model<EventDocument>,
    userModel: Model<UserDocument>,
    ticketModel: Model<TicketDocument>,
    reactionService: ReactionService<EventDocument>,
    apiService: ApiService<EventDocument, QueryEventDto>,
  );
  createEvent(
    body: CreateEventDto,
    user: string,
  ): Promise<{
    event: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./event.schema').Event> &
        import('./event.schema').Event & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./event.schema').Event> &
      import('./event.schema').Event & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  updateEvent(
    eventId: string,
    body: UpdateEventDto,
    user: string,
  ): Promise<{
    event: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./event.schema').Event> &
        import('./event.schema').Event & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./event.schema').Event> &
      import('./event.schema').Event & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  deleteEvent(
    eventId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  getEvent(eventId: string): Promise<{
    event: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, import('./event.schema').Event> &
        import('./event.schema').Event & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, import('./event.schema').Event> &
      import('./event.schema').Event & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  getAllEvents(obj: QueryEventDto): Promise<{
    events: (import('mongoose').Document<
      unknown,
      {},
      import('./event.schema').Event
    > &
      import('./event.schema').Event & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  getAllPreviousReservedEvents(
    obj: QueryEventDto,
    user: string,
  ): Promise<{
    events: (import('mongoose').Document<
      unknown,
      {},
      import('./event.schema').Event
    > &
      import('./event.schema').Event & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  getAllFutureEvents(
    obj: QueryEventDto,
    user: string,
  ): Promise<{
    events: (import('mongoose').Document<
      unknown,
      {},
      import('./event.schema').Event
    > &
      import('./event.schema').Event & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  addLike(
    eventId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  removeLike(
    eventId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  getLikes(
    eventId: string,
    query: FindQuery,
  ): Promise<{
    likes: (import('mongoose').Document<
      unknown,
      {},
      import('../likes/likes.schema').Likes
    > &
      import('../likes/likes.schema').Likes & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  addComment(
    body: CreateCommentDto,
    eventId: string,
    user: string,
  ): Promise<
    import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('../comment/comment.schema').Comment
      > &
        import('../comment/comment.schema').Comment & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('../comment/comment.schema').Comment
      > &
      import('../comment/comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>
  >;
  removeComment(
    commentId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  getComments(
    eventId: string,
    query: FindQuery,
  ): Promise<{
    comments: (import('mongoose').Document<
      unknown,
      {},
      import('../comment/comment.schema').Comment
    > &
      import('../comment/comment.schema').Comment & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
  addSaved(
    eventId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  deleteSaved(
    eventId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  getAllSaved(
    eventId: string,
    query: FindQuery,
  ): Promise<{
    totalPages: number;
    page: number;
    limit: number;
    saved: {
      user: import('mongoose').Types.ObjectId;
      createdAt?: Date;
    }[];
  }>;
}
