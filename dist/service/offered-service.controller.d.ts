import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { CreateOfferedDto } from './dto/create.service.dto';
import { QueryOfferedDto } from './dto/query.service.dto';
import { UpdateOfferedDto } from './dto/update.service.dto';
import { OfferedService } from './offered-service.service';
export declare class OfferedController {
    private readonly offeredService;
    constructor(offeredService: OfferedService);
    getMyDeletedServices(query: FindQuery, req: any): Promise<{
        services: (import("mongoose").Document<unknown, {}, import("./offered-service.schema").Offered> & import("./offered-service.schema").Offered & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    getMyArchivedServices(query: FindQuery, req: any): Promise<{
        services: (import("mongoose").Document<unknown, {}, import("./offered-service.schema").Offered> & import("./offered-service.schema").Offered & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    createService(body: CreateOfferedDto, req: any): Promise<{
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./offered-service.schema").Offered> & import("./offered-service.schema").Offered & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./offered-service.schema").Offered> & import("./offered-service.schema").Offered & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllServices(query: QueryOfferedDto): Promise<{
        services: (import("mongoose").Document<unknown, {}, import("./offered-service.schema").Offered> & import("./offered-service.schema").Offered & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    updateService(serviceId: string, body: UpdateOfferedDto, req: any): Promise<{
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./offered-service.schema").Offered> & import("./offered-service.schema").Offered & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./offered-service.schema").Offered> & import("./offered-service.schema").Offered & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteService(serviceId: string, req: any): Promise<{
        status: string;
    }>;
    createServiceComment(serviceId: string, body: CreateCommentDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getServiceComments(serviceId: string, query: FindQuery): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    deleteserviceComment(commentId: string, req: any): Promise<{
        status: string;
    }>;
    addServiceLike(serviceId: string, req: any): Promise<{
        status: string;
    }>;
    removeServiceLike(serviceId: string, req: any): Promise<{
        status: string;
    }>;
    getServiceLikes(serviceId: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    addSavedService(serviceId: string, req: any): Promise<{
        status: string;
    }>;
    removeSavedService(serviceId: string, req: any): Promise<{
        status: string;
    }>;
    getSavedServices(serviceId: string, query: FindQuery): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    getServiceById(serviceId: string): Promise<{
        service: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./offered-service.schema").Offered> & import("./offered-service.schema").Offered & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./offered-service.schema").Offered> & import("./offered-service.schema").Offered & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    requestService(serviceId: string, req: any): Promise<{
        status: string;
    }>;
    removeRequestService(serviceId: string, req: any): Promise<{
        status: string;
    }>;
    getRequestedServices(serviceId: string, query: FindQuery): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        requested: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
}
