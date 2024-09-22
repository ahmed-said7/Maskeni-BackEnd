import { CreateMessageDto } from './dto/create.message.dto';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update.message.dto';
import { QueryMessageDto } from './dto/query.message.dto';
export declare class MessageController {
    private msgService;
    constructor(msgService: MessageService);
    createMessage(body: CreateMessageDto, req: any): Promise<{
        message: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./messahe.schema").Message> & import("./messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./messahe.schema").Message> & import("./messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    onScroll(chatId: string, req: any, query: QueryMessageDto): Promise<{
        messages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./messahe.schema").Message> & import("./messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./messahe.schema").Message> & import("./messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        page: number;
    }>;
    getChatMessages(chatId: string, req: any): Promise<{
        messages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./messahe.schema").Message> & import("./messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./messahe.schema").Message> & import("./messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    updateMessage(body: UpdateMessageDto, messageId: string, req: any): Promise<{
        status: string;
        message: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./messahe.schema").Message> & import("./messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./messahe.schema").Message> & import("./messahe.schema").Message & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    deleteMessages(messageId: string, req: any): Promise<{
        status: string;
    }>;
}
