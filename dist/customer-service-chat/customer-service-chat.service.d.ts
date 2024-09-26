import { Model } from 'mongoose';
import { CustomerServiceChat, CustomerServiceChatDocument } from './customer-service-chat.schema';
import { ApiService } from 'src/common/Api/api.service';
import { FindQuery } from 'src/common/types';
import { CustomerServiceMessageService } from 'src/customer-service-message/customer-service-message.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class CustomerServiceChatService {
    private chatModel;
    private apiService;
    private customerServiceMsg;
    private eventEmitter;
    constructor(chatModel: Model<CustomerServiceChatDocument>, apiService: ApiService<CustomerServiceChatDocument, FindQuery>, customerServiceMsg: CustomerServiceMessageService, eventEmitter: EventEmitter2);
    createChat(user: string): Promise<{
        chat: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, CustomerServiceChat> & CustomerServiceChat & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, CustomerServiceChat> & CustomerServiceChat & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
        messages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../customer-service-message/customer-service-message.schema").CustomerServiceMessage> & import("../customer-service-message/customer-service-message.schema").CustomerServiceMessage & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../customer-service-message/customer-service-message.schema").CustomerServiceMessage> & import("../customer-service-message/customer-service-message.schema").CustomerServiceMessage & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getChatMemebers(user: string): Promise<{
        admin: import("mongoose").Types.ObjectId;
        user: import("mongoose").Types.ObjectId;
    }>;
    getChats(obj: FindQuery): Promise<{
        chats: (import("mongoose").Document<unknown, {}, CustomerServiceChat> & CustomerServiceChat & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
}
