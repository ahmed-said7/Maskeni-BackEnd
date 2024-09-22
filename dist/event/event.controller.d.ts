import { UpdateEventDto } from './dto/update.event.dto';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create.event.dto';
import { QueryEventDto } from './dto/query.event.dto';
import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
export declare class EventController {
    private eventService;
    constructor(eventService: EventService);
    createEvent(body: CreateEventDto, req: any): Promise<{
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./event.schema").Event> & import("./event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./event.schema").Event> & import("./event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllEvents(query: QueryEventDto): Promise<{
        events: (import("mongoose").Document<unknown, {}, import("./event.schema").Event> & import("./event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    getFutureEvents(query: QueryEventDto, req: any): Promise<{
        events: (import("mongoose").Document<unknown, {}, import("./event.schema").Event> & import("./event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    getPreviousEvents(query: QueryEventDto, req: any): Promise<{
        events: (import("mongoose").Document<unknown, {}, import("./event.schema").Event> & import("./event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    updateEvent(eventId: string, body: UpdateEventDto, req: any): Promise<{
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./event.schema").Event> & import("./event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./event.schema").Event> & import("./event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteEvent(eventId: string, req: any): Promise<{
        status: string;
    }>;
    createEventComment(eventId: string, body: CreateCommentDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getEventComment(eventId: string, query: FindQuery): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    deleteEventComment(commentId: string, req: any): Promise<{
        status: string;
    }>;
    addEventLike(eventId: string, req: any): Promise<{
        status: string;
    }>;
    removeEventLike(eventId: string, req: any): Promise<{
        status: string;
    }>;
    getEventLikes(eventId: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    addSavedEvent(eventId: string, req: any): Promise<{
        status: string;
    }>;
    removeSavedEvent(eventId: string, req: any): Promise<{
        status: string;
    }>;
    getSavedEvents(eventId: string, query: QueryEventDto): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    getEvent(eventId: string): Promise<{
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./event.schema").Event> & import("./event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./event.schema").Event> & import("./event.schema").Event & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
