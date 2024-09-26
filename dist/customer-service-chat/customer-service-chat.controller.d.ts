import { CustomerServiceChatService } from './customer-service-chat.service';
import { FindQuery } from 'src/common/types';
export declare class CustomerServiceChatController {
    private chatService;
    constructor(chatService: CustomerServiceChatService);
    createChat(req: any): Promise<{
        chat: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./customer-service-chat.schema").CustomerServiceChat> & import("./customer-service-chat.schema").CustomerServiceChat & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./customer-service-chat.schema").CustomerServiceChat> & import("./customer-service-chat.schema").CustomerServiceChat & {
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
    getUserChats(query: FindQuery): Promise<{
        chats: (import("mongoose").Document<unknown, {}, import("./customer-service-chat.schema").CustomerServiceChat> & import("./customer-service-chat.schema").CustomerServiceChat & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    getChatMembers(id: string, req: any): Promise<{
        admin: import("mongoose").Types.ObjectId;
        user: import("mongoose").Types.ObjectId;
    }>;
}
