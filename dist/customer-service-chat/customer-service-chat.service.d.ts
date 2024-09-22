import { Model } from 'mongoose';
import {
  CustomerServiceChat,
  CustomerServiceChatDocument,
} from './customer-service-chat.schema';
import { ApiService } from 'src/common/Api/api.service';
import { FindQuery } from 'src/common/types';
export declare class CustomerServiceChatService {
  private chatModel;
  private apiService;
  constructor(
    chatModel: Model<CustomerServiceChatDocument>,
    apiService: ApiService<CustomerServiceChatDocument, FindQuery>,
  );
  createChat(user: string): Promise<
    | (import('mongoose').Document<
        unknown,
        {},
        import('mongoose').Document<unknown, {}, CustomerServiceChat> &
          CustomerServiceChat & {
            _id: import('mongoose').Types.ObjectId;
          }
      > &
        import('mongoose').Document<unknown, {}, CustomerServiceChat> &
        CustomerServiceChat & {
          _id: import('mongoose').Types.ObjectId;
        } & Required<{
          _id: import('mongoose').Types.ObjectId;
        }>)
    | {
        chat: import('mongoose').Document<
          unknown,
          {},
          import('mongoose').Document<unknown, {}, CustomerServiceChat> &
            CustomerServiceChat & {
              _id: import('mongoose').Types.ObjectId;
            }
        > &
          import('mongoose').Document<unknown, {}, CustomerServiceChat> &
          CustomerServiceChat & {
            _id: import('mongoose').Types.ObjectId;
          } & Required<{
            _id: import('mongoose').Types.ObjectId;
          }>;
      }
  >;
  getChatMemebers(user: string): Promise<{
    admin: import('mongoose').Types.ObjectId;
    user: import('mongoose').Types.ObjectId;
  }>;
  getChats(obj: FindQuery): Promise<{
    chats: (import('mongoose').Document<unknown, {}, CustomerServiceChat> &
      CustomerServiceChat & {
        _id: import('mongoose').Types.ObjectId;
      })[];
    pagination: import('src/common/Api/api.service').Pagination;
  }>;
}
