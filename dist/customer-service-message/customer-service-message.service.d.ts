import { Model } from 'mongoose';
import {
  CreateAdminMessageDto,
  CreateMessageDto,
} from './dto/create.message.dto';
import { QueryMessageDto } from './dto/query.message.dto';
import { CustomerServiceChatDocument } from 'src/customer-service-chat/customer-service-chat.schema';
import {
  CustomerServiceMessage,
  CustomerServiceMessageDocument,
} from './customer-service-message.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class CustomerServiceMessageService {
  private chatModel;
  private msgModel;
  private eventEmitter;
  constructor(
    chatModel: Model<CustomerServiceChatDocument>,
    msgModel: Model<CustomerServiceMessageDocument>,
    eventEmitter: EventEmitter2,
  );
  createMessage(
    body: CreateMessageDto,
    user: string,
    role: string,
  ): Promise<{
    message: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, CustomerServiceMessage> &
        CustomerServiceMessage & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, CustomerServiceMessage> &
      CustomerServiceMessage & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  sendMessageByAdmin(
    body: CreateAdminMessageDto,
    user: string,
    admin: string,
  ): Promise<{
    status: string;
  }>;
  private handleChatJoin;
  private validateChat;
  joinChatByAdmin(
    chatId: string,
    user: string,
  ): Promise<{
    messages: (import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, CustomerServiceMessage> &
        CustomerServiceMessage & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, CustomerServiceMessage> &
      CustomerServiceMessage & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>)[];
  }>;
  joinChatByUser(
    chatId: string,
    user: string,
  ): Promise<{
    messages: (import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, CustomerServiceMessage> &
        CustomerServiceMessage & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, CustomerServiceMessage> &
      CustomerServiceMessage & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>)[];
  }>;
  onScroll(
    chatId: string,
    user: string,
    query: QueryMessageDto,
  ): Promise<{
    messages: (import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, CustomerServiceMessage> &
        CustomerServiceMessage & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, CustomerServiceMessage> &
      CustomerServiceMessage & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>)[];
    page: number;
  }>;
}
