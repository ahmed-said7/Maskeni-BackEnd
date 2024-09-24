import { Model } from 'mongoose';
import { ApiService } from 'src/common/Api/api.service';
import { ReactionService } from 'src/reaction/reaction.service';
import { FindQuery } from 'src/common/types';
import { UserDocument } from 'src/user/user.schema';
import { Question, QuestionDocument } from './question.schema';
import { CreateShareDto } from 'src/share/dto/create.share.dto';
import { UpdateQuestionDto } from './dto/update.question.dto';
import { QueryQuestionDto } from './dto/query.question.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
export declare class QuestionService {
    private questionModel;
    private userModel;
    private reactionService;
    private apiService;
    constructor(questionModel: Model<QuestionDocument>, userModel: Model<UserDocument>, reactionService: ReactionService<QuestionDocument>, apiService: ApiService<QuestionDocument, FindQuery>);
    createQuestion(body: CreateShareDto, user: string): Promise<{
        question: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Question> & Question & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Question> & Question & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    updateQuestion(questionId: string, body: UpdateQuestionDto, user: string): Promise<{
        question: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Question> & Question & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Question> & Question & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteQuestion(questionId: string, user: string): Promise<{
        status: string;
    }>;
    getQuestion(questionId: string): Promise<{
        question: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Question> & Question & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Question> & Question & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllQuestion(obj: QueryQuestionDto): Promise<{
        questions: (import("mongoose").Document<unknown, {}, Question> & Question & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addLike(questionId: string, user: string): Promise<{
        status: string;
    }>;
    removeLike(questionId: string, user: string): Promise<{
        status: string;
    }>;
    getLikes(questionId: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addComment(body: CreateCommentDto, questionId: string, user: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeComment(commentId: string, user: string): Promise<{
        status: string;
    }>;
    getComments(questionId: string, query: FindQuery): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    addSaved(questionId: string, user: string): Promise<{
        status: string;
    }>;
    deleteSaved(questionId: string, user: string): Promise<{
        status: string;
    }>;
    getAllSaved(questionId: string, query: FindQuery): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    getMyArchivedQuestion(obj: FindQuery, user: string): Promise<{
        questions: (import("mongoose").Document<unknown, {}, Question> & Question & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    getMyDeletedQuestion(obj: FindQuery, user: string): Promise<{
        questions: (import("mongoose").Document<unknown, {}, Question> & Question & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
}
