import { HydratedDocument, Types } from 'mongoose';
export declare class Message {
    content: string;
    image?: string;
    isDeleted: boolean;
    chat: Types.ObjectId;
    user: Types.ObjectId;
    seen?: boolean;
}
export type MessageDocument = HydratedDocument<Message>;
export declare const MessageSchema: import("mongoose").Schema<Message, import("mongoose").Model<Message, any, any, any, import("mongoose").Document<unknown, any, Message> & Message & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Message, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Message>> & import("mongoose").FlatRecord<Message> & {
    _id: Types.ObjectId;
}>;
