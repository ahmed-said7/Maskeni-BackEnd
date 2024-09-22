import { FindQuery } from 'src/common/types';
import { ShareService } from './share.service';
import { CreateShareDto } from './dto/create.share.dto';
import { QueryShareDto } from './dto/query.share.dto';
import { UpdateShareDto } from './dto/update.share.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
export declare class ShareController {
    private shareService;
    constructor(shareService: ShareService);
    createShare(body: CreateShareDto, req: any): Promise<{
        event: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./share.schema").Share> & import("./share.schema").Share & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./share.schema").Share> & import("./share.schema").Share & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllShare(query: QueryShareDto): Promise<{
        events: (import("mongoose").Document<unknown, {}, import("./share.schema").Share> & import("./share.schema").Share & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    updateShare(shareId: string, body: UpdateShareDto, req: any): Promise<{
        share: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./share.schema").Share> & import("./share.schema").Share & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./share.schema").Share> & import("./share.schema").Share & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteShare(shareId: string, req: any): Promise<{
        status: string;
    }>;
    createShareComment(shareId: string, body: CreateCommentDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getShareComment(shareId: string, query: FindQuery): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    deleteShareComment(commentId: string, req: any): Promise<{
        status: string;
    }>;
    addShareLike(shareId: string, req: any): Promise<{
        status: string;
    }>;
    removeShareLike(shareId: string, req: any): Promise<{
        status: string;
    }>;
    getShareLikes(shareId: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    addSavedShare(shareId: string, req: any): Promise<{
        status: string;
    }>;
    removeSavedShare(shareId: string, req: any): Promise<{
        status: string;
    }>;
    getSavedShares(shareId: string, query: QueryShareDto): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    getShare(shareId: string): Promise<{
        share: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./share.schema").Share> & import("./share.schema").Share & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./share.schema").Share> & import("./share.schema").Share & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
