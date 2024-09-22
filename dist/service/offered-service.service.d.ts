import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { UserDocument } from 'src/user/user.schema';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { QueryOfferedDto } from './dto/query.service.dto';
import { CreateOfferedDto } from './dto/create.service.dto';
import { UpdateOfferedDto } from './dto/update.service.dto';
import { Offered, OfferedDocument } from './offered-service.schema';
export declare class OfferedService {
    private serviceModel;
    private userModel;
    private reactionService;
    private apiService;
    constructor(serviceModel: Model<OfferedDocument>, userModel: Model<UserDocument>, reactionService: ReactionService<OfferedDocument>, apiService: ApiService<OfferedDocument, QueryOfferedDto>);
    createService(body: CreateOfferedDto, user: string): Promise<{
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Offered> & Offered & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Offered> & Offered & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateService(serviceId: string, body: UpdateOfferedDto, user: string): Promise<{
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Offered> & Offered & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Offered> & Offered & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteService(serviceId: string, user: string): Promise<{
        status: string;
    }>;
    getService(serviceId: string): Promise<{
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Offered> & Offered & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Offered> & Offered & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllservices(obj: QueryOfferedDto): Promise<{
        services: (import("mongoose").Document<unknown, {}, Offered> & Offered & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addLike(serviceId: string, user: string): Promise<{
        status: string;
    }>;
    removeLike(serviceId: string, user: string): Promise<{
        status: string;
    }>;
    getLikes(serviceId: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addComment(body: CreateCommentDto, serviceId: string, user: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeComment(commentId: string, user: string): Promise<{
        status: string;
    }>;
    getComments(serviceId: string, query: FindQuery): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addSaved(serviceId: string, user: string): Promise<{
        status: string;
    }>;
    deleteSaved(serviceId: string, user: string): Promise<{
        status: string;
    }>;
    getAllSaved(serviceId: string, query: FindQuery): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    addRequested(serviceId: string, user: string): Promise<{
        status: string;
    }>;
    deleteRequested(serviceId: string, user: string): Promise<{
        status: string;
    }>;
    getAllRequested(serviceId: string, query: FindQuery): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        requested: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
}
