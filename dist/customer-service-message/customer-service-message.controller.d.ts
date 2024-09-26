import { CreateAdminMessageDto, CreateMessageDto } from './dto/create.message.dto';
import { QueryMessageDto } from './dto/query.message.dto';
import { CustomerServiceMessageService } from './customer-service-message.service';
export declare class CustomerServiceMessageController {
    private msgService;
    constructor(msgService: CustomerServiceMessageService);
    createMessage(body: CreateMessageDto, req: any): Promise<{
        message: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./customer-service-message.schema").CustomerServiceMessage> & import("./customer-service-message.schema").CustomerServiceMessage & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./customer-service-message.schema").CustomerServiceMessage> & import("./customer-service-message.schema").CustomerServiceMessage & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    adminMessage(user: string, req: any, body: CreateAdminMessageDto): Promise<{
        status: string;
    }>;
    onScroll(chatId: string, req: any, query: QueryMessageDto): Promise<{
        messages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./customer-service-message.schema").CustomerServiceMessage> & import("./customer-service-message.schema").CustomerServiceMessage & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./customer-service-message.schema").CustomerServiceMessage> & import("./customer-service-message.schema").CustomerServiceMessage & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    joinAdmin(chatId: string, req: any): Promise<{
        messages: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./customer-service-message.schema").CustomerServiceMessage> & import("./customer-service-message.schema").CustomerServiceMessage & {
            _id: import("mongoose").Types.ObjectId;
        }> & import("mongoose").Document<unknown, {}, import("./customer-service-message.schema").CustomerServiceMessage> & import("./customer-service-message.schema").CustomerServiceMessage & {
            _id: import("mongoose").Types.ObjectId;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
}
