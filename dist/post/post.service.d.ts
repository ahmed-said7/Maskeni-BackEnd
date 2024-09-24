import { Model } from 'mongoose';
import { PostDocument, Post } from './post.schema';
import { Group, GroupDocument } from 'src/group/group.schema';
import { CreatePostDto } from './dto/post.create.dto';
import { UpdatePostDto } from './dto/post.update.dto';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { UserDocument } from 'src/user/user.schema';
import { LikesService } from 'src/likes/likes.service';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { CommentService } from 'src/comment/comment.service';
export declare class PostService {
    private postModel;
    private groupModel;
    private userModel;
    private reactionService;
    private apiService;
    private likesService;
    private commentService;
    constructor(postModel: Model<PostDocument>, groupModel: Model<GroupDocument>, userModel: Model<UserDocument>, reactionService: ReactionService<PostDocument>, apiService: ApiService<GroupDocument, FindQuery>, likesService: LikesService, commentService: CommentService);
    createPost(body: CreatePostDto, user: string): Promise<{
        post: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Post> & Post & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Post> & Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deletePost(postId: string, user: string): Promise<{
        status: string;
    }>;
    updatePost(body: UpdatePostDto, postId: string, user: string): Promise<{
        status: string;
        post: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Post> & Post & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Post> & Post & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getGroupPosts(groupId: string, user: string, obj: FindQuery): Promise<{
        posts: (import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    getUserGroupsPosts(user: string, obj: FindQuery): Promise<{
        posts: (import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addLike(postId: string, user: string): Promise<{
        status: string;
    }>;
    private validateGroup;
    removeLike(postId: string, user: string): Promise<{
        status: string;
    }>;
    getLikes(postId: string, user: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addComment(body: CreateCommentDto, postId: string, user: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeComment(commentId: string, user: string): Promise<{
        status: string;
    }>;
    getComments(postId: string, user: string, query: FindQuery): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addSaved(postId: string, user: string): Promise<{
        status: string;
    }>;
    deleteSaved(postId: string, user: string): Promise<{
        status: string;
    }>;
    getAllSaved(postId: string, user: string, query: FindQuery): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    getMyArchivedPosts(obj: FindQuery, user: string): Promise<{
        posts: (import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    getMyDeletedPosts(obj: FindQuery, user: string): Promise<{
        posts: (import("mongoose").Document<unknown, {}, Group> & Group & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
}
