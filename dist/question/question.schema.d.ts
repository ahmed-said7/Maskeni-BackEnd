import { HydratedDocument, Types } from 'mongoose';
export declare class Question {
    content: string;
    postType?: string;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    isDeleted: boolean;
    isAccepted: boolean;
    isArchived: boolean;
    saved: {
        user: Types.ObjectId;
        createdAt?: Date;
        _id: Types.ObjectId;
    }[];
    comments: Types.ObjectId[];
    likes: Types.ObjectId[];
    likeCount: number;
    commentCount: number;
    savedCount: number;
    images: string[];
    user: Types.ObjectId;
}
export type QuestionDocument = HydratedDocument<Question>;
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, import("mongoose").Document<unknown, any, Question> & Question & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Question>> & import("mongoose").FlatRecord<Question> & {
    _id: Types.ObjectId;
}>;
