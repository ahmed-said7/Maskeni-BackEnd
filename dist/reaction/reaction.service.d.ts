import { Model } from 'mongoose';
import { IEntityType } from './dto/interface.entity.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { CommentService } from 'src/comment/comment.service';
import { LikesService } from 'src/likes/likes.service';
import { FindQuery } from 'src/common/types';
export declare class ReactionService<T extends IEntityType> {
    private commentService;
    private likesService;
    constructor(commentService: CommentService, likesService: LikesService);
    private PostModel;
    setModel(PostModel: Model<T>): this;
    createComment(body: CreateCommentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getAllComments(query: FindQuery, id: string): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    deleteComment(commentId: string, userId: string): Promise<{
        status: string;
    }>;
    createLike(postId: string, userId: string): Promise<{
        status: string;
    }>;
    getAllLikes(postId: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    deleteLike(postId: string, userId: string): Promise<{
        status: string;
    }>;
    createSaved(postId: string, userId: string): Promise<void>;
    getAllSaved(query: FindQuery, id: string): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    deleteSaved(postId: string, userId: string): Promise<void>;
    createRequestedService(postId: string, userId: string): Promise<void>;
    getAllRequestedServices(query: FindQuery, id: string): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        requested: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    deleteRequestedService(postId: string, userId: string): Promise<void>;
}
