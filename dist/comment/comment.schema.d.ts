import { HydratedDocument, Types } from 'mongoose';
export declare class Comment {
    content: string;
    image: string;
    user: Types.ObjectId;
    parentComment: Types.ObjectId;
    post: string;
    replies: Types.ObjectId[];
    likes: Types.ObjectId[];
    repliesCount: number;
    likesCount: number;
}
export type CommentDocument = HydratedDocument<Comment>;
export declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any, import("mongoose").Document<unknown, any, Comment> & Comment & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Comment>> & import("mongoose").FlatRecord<Comment> & {
    _id: Types.ObjectId;
}>;
