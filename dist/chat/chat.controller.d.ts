import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create.chat';
import { FindQuery } from 'src/common/types';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    createChat(body: CreateChatDto, req: any): Promise<{
        messages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../message/messahe.schema").Message> & import("../message/messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../message/messahe.schema").Message> & import("../message/messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        chat: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./chat.schema").Chat> & import("./chat.schema").Chat & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./chat.schema").Chat> & import("./chat.schema").Chat & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getUserChats(query: FindQuery, req: any): Promise<{
        chats: (import("mongoose").Document<unknown, {}, import("./chat.schema").Chat> & import("./chat.schema").Chat & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("../common/Api/api.service").Pagination;
    }>;
    deleteChat(id: string, req: any): Promise<{
        status: string;
    }>;
    getChatMembers(id: string, req: any): Promise<{
        admin: import("mongoose").Types.ObjectId;
        user: import("mongoose").Types.ObjectId;
    }>;
}
