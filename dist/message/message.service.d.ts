import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create.message.dto';
import { ChatDocument } from 'src/chat/chat.schema';
import { Message, MessageDocument } from './messahe.schema';
import { UpdateMessageDto } from './dto/update.message.dto';
import { QueryMessageDto } from './dto/query.message.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class MessageService {
    private chatModel;
    private msgModel;
    private eventEmitter;
    constructor(chatModel: Model<ChatDocument>, msgModel: Model<MessageDocument>, eventEmitter: EventEmitter2);
    createMessage(body: CreateMessageDto, user: string): Promise<{
        message: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Message> & Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Message> & Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteMessage(messageId: string, user: string): Promise<{
        status: string;
    }>;
    updateMessage(messageId: string, body: UpdateMessageDto, user: string): Promise<{
        status: string;
        message: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Message> & Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Message> & Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    private validateChat;
    getChatMessages(chatId: string, user: string): Promise<{
        messages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Message> & Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Message> & Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    onScroll(chatId: string, user: string, query: QueryMessageDto): Promise<{
        messages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Message> & Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, Message> & Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
}
