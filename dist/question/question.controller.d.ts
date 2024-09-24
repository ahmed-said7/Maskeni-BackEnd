import { FindQuery } from 'src/common/types';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create.question.dto';
import { QueryQuestionDto } from './dto/query.question.dto';
import { UpdateQuestionDto } from './dto/update.question.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    getMyDeletedQuestion(query: FindQuery, req: any): Promise<{
        questions: (import("mongoose").Document<unknown, {}, import("./question.schema").Question> & import("./question.schema").Question & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    getMyArchivedQuestion(query: FindQuery, req: any): Promise<{
        questions: (import("mongoose").Document<unknown, {}, import("./question.schema").Question> & import("./question.schema").Question & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    createQuestion(body: CreateQuestionDto, req: any): Promise<{
        question: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./question.schema").Question> & import("./question.schema").Question & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./question.schema").Question> & import("./question.schema").Question & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllQuestion(query: QueryQuestionDto): Promise<{
        questions: (import("mongoose").Document<unknown, {}, import("./question.schema").Question> & import("./question.schema").Question & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    updateQuestion(questionId: string, body: UpdateQuestionDto, req: any): Promise<{
        question: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./question.schema").Question> & import("./question.schema").Question & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./question.schema").Question> & import("./question.schema").Question & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteQuestion(questionId: string, req: any): Promise<{
        status: string;
    }>;
    createQuestionComment(questionId: string, body: CreateCommentDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getQuestionComment(questionId: string, query: FindQuery): Promise<{
        comments: (import("mongoose").Document<unknown, {}, import("../comment/comment.schema").Comment> & import("../comment/comment.schema").Comment & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    deleteQuestionComment(commentId: string, req: any): Promise<{
        status: string;
    }>;
    addQuestionLike(questionId: string, req: any): Promise<{
        status: string;
    }>;
    removeQuestionLike(questionId: string, req: any): Promise<{
        status: string;
    }>;
    getQuestionLikes(questionId: string, query: FindQuery): Promise<{
        likes: (import("mongoose").Document<unknown, {}, import("../likes/likes.schema").Likes> & import("../likes/likes.schema").Likes & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    addSavedQuestion(questionId: string, req: any): Promise<{
        status: string;
    }>;
    removeSavedQuestion(questionId: string, req: any): Promise<{
        status: string;
    }>;
    getSavedQuestion(questionId: string, query: QueryQuestionDto): Promise<{
        totalPages: number;
        page: number;
        limit: number;
        saved: {
            user: import("mongoose").Types.ObjectId;
            createdAt?: Date;
        }[];
    }>;
    getQuestion(questionId: string): Promise<{
        question: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./question.schema").Question> & import("./question.schema").Question & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./question.schema").Question> & import("./question.schema").Question & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
