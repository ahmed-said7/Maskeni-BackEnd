import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create.chat';
import { Chat, ChatDocument } from './chat.schema';
import { UserDocument } from 'src/user/user.schema';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { MessageService } from 'src/message/message.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ChatService {
    private chatModel;
    private userModel;
    private apiService;
    private msgService;
    private eventEmitter;
    constructor(chatModel: Model<ChatDocument>, userModel: Model<UserDocument>, apiService: ApiService<ChatDocument, FindQuery>, msgService: MessageService, eventEmitter: EventEmitter2);
    createChat(body: CreateChatDto, user: string): Promise<{
        messages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../message/messahe.schema").Message> & import("../message/messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("../message/messahe.schema").Message> & import("../message/messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        chat: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Chat> & Chat & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Chat> & Chat & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getChats(obj: FindQuery, user: string): Promise<{
        chats: (import("mongoose").Document<unknown, {}, Chat> & Chat & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: import("src/common/Api/api.service").Pagination;
    }>;
    deleteChat(chatId: string, user: string): Promise<{
        status: string;
    }>;
    getChatMemebers(chatId: string, user: string): Promise<{
        admin: import("mongoose").Types.ObjectId;
        user: import("mongoose").Types.ObjectId;
    }>;
}
