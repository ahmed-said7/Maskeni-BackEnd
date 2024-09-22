import { HydratedDocument, Types } from 'mongoose';
export declare class CustomerServiceChat {
    isBusy: boolean;
    lastMessage: Types.ObjectId;
    user: Types.ObjectId;
    customer_service: Types.ObjectId;
}
export type CustomerServiceChatDocument = HydratedDocument<CustomerServiceChat>;
export declare const CustomerServiceChatSchema: import("mongoose").Schema<CustomerServiceChat, import("mongoose").Model<CustomerServiceChat, any, any, any, import("mongoose").Document<unknown, any, CustomerServiceChat> & CustomerServiceChat & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CustomerServiceChat, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CustomerServiceChat>> & import("mongoose").FlatRecord<CustomerServiceChat> & {
    _id: Types.ObjectId;
}>;
