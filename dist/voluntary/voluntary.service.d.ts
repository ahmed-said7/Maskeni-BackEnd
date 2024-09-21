import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { UserDocument } from 'src/user/user.schema';
import { QueryVoluntaryDto } from './dto/voluntary.query.dto';
import { CreateVoluntaryDto } from './dto/voluntary.create.dto';
import { UpdateVoluntaryDto } from './dto/voluntary.update.dto';
import { Voluntary, VoluntaryDocument } from './voluntary.schema';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
export declare class VoluntaryService {
    private voluntaryModel;
    private userModel;
    private reactionService;
    private apiService;
    constructor(voluntaryModel: Model<VoluntaryDocument>, userModel: Model<UserDocument>, reactionService: ReactionService<VoluntaryDocument>, apiService: ApiService<VoluntaryDocument, QueryVoluntaryDto>);
    createVoluntary(body: CreateVoluntaryDto, user: string): Promise<{
        voluntary: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Voluntary> & Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Voluntary> & Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateVoluntary(voluntaryId: string, body: UpdateVoluntaryDto, user: string): Promise<{
        voluntary: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Voluntary> & Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Voluntary> & Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteVoluntary(voluntaryId: string, user: string): Promise<{
        status: string;
    }>;
    getVoluntary(voluntaryId: string): Promise<{
        voluntary: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Voluntary> & Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Voluntary> & Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllVoluntary(obj: QueryVoluntaryDto): Promise<{
        voluntarys: (import("mongoose").Document<unknown, {}, Voluntary> & Voluntary & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addLike(voluntaryId: string, user: string): Promise<{
        status: string;
    }>;
    removeLike(voluntaryId: string, user: string): Promise<{
        status: string;
    }>;
    getLikes(voluntaryId: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addComment(body: CreateCommentDto, voluntaryId: string, user: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeComment(voluntaryId: string, commentId: string, user: string): Promise<{
        status: string;
    }>;
    getComments(voluntaryId: string, query: FindQuery): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addSaved(voluntaryId: string, user: string): Promise<{
        status: string;
    }>;
    deleteSaved(voluntaryId: string, user: string): Promise<{
        status: string;
    }>;
    getAllSaved(voluntaryId: string, query: FindQuery): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
}
