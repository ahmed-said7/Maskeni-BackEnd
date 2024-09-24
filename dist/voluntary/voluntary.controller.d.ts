import { FindQuery } from 'src/common/types';
import { VoluntaryService } from './voluntary.service';
import { CreateVoluntaryDto } from './dto/voluntary.create.dto';
import { QueryVoluntaryDto } from './dto/voluntary.query.dto';
import { UpdateVoluntaryDto } from './dto/voluntary.update.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
export declare class VoluntaryController {
    private voluntaryService;
    constructor(voluntaryService: VoluntaryService);
    getMyDeletedVoluntary(query: FindQuery, req: any): Promise<{
        voluntary: (import("mongoose").Document<unknown, {}, import("./voluntary.schema").Voluntary> & import("./voluntary.schema").Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    getMyArchivedVoluntary(query: FindQuery, req: any): Promise<{
        voluntary: (import("mongoose").Document<unknown, {}, import("./voluntary.schema").Voluntary> & import("./voluntary.schema").Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    createVoluntary(body: CreateVoluntaryDto, req: any): Promise<{
        voluntary: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./voluntary.schema").Voluntary> & import("./voluntary.schema").Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./voluntary.schema").Voluntary> & import("./voluntary.schema").Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllVoluntarys(query: QueryVoluntaryDto): Promise<{
        voluntary: (import("mongoose").Document<unknown, {}, import("./voluntary.schema").Voluntary> & import("./voluntary.schema").Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    updateVoluntary(voluntaryId: string, body: UpdateVoluntaryDto, req: any): Promise<{
        voluntary: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./voluntary.schema").Voluntary> & import("./voluntary.schema").Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./voluntary.schema").Voluntary> & import("./voluntary.schema").Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteVoluntary(voluntaryId: string, req: any): Promise<{
        status: string;
    }>;
    createVoluntaryComment(voluntaryId: string, body: CreateCommentDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getVoluntaryComment(voluntaryId: string, query: FindQuery): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    deleteVoluntaryComment(commentId: string, req: any): Promise<{
        status: string;
    }>;
    addVoluntaryLike(voluntaryId: string, req: any): Promise<{
        status: string;
    }>;
    removeVoluntaryLike(voluntaryId: string, req: any): Promise<{
        status: string;
    }>;
    getVoluntaryLikes(voluntaryId: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    addSavedVoluntary(voluntaryId: string, req: any): Promise<{
        status: string;
    }>;
    removeSavedVoluntary(voluntaryId: string, req: any): Promise<{
        status: string;
    }>;
    getSavedVoluntarys(voluntaryId: string, query: QueryVoluntaryDto): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    getVoluntary(voluntaryId: string): Promise<{
        voluntary: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./voluntary.schema").Voluntary> & import("./voluntary.schema").Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./voluntary.schema").Voluntary> & import("./voluntary.schema").Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
