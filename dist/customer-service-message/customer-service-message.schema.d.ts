import { HydratedDocument, Types } from 'mongoose';
export declare class CustomerServiceMessage {
    content: string;
    chat: Types.ObjectId;
    user: Types.ObjectId;
    type: string;
    seen: boolean;
}
export type CustomerServiceMessageDocument = HydratedDocument<CustomerServiceMessage>;
export declare const CustomerServiceMessageSchema: import("mongoose").Schema<CustomerServiceMessage, import("mongoose").Model<CustomerServiceMessage, any, any, any, import("mongoose").Document<unknown, any, CustomerServiceMessage> & CustomerServiceMessage & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CustomerServiceMessage, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CustomerServiceMessage>> & import("mongoose").FlatRecord<CustomerServiceMessage> & {
    _id: Types.ObjectId;
}>;
