import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CustomerServiceChat,
  CustomerServiceChatDocument,
} from './customer-service-chat.schema';
import { ApiService } from 'src/common/Api/api.service';
import { FindQuery } from 'src/common/types';
import { CustomerServiceMessageService } from 'src/customer-service-message/customer-service-message.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { All_Role, emittedEvents } from 'src/common/enum';

@Injectable()
export class CustomerServiceChatService {
  constructor(
    @InjectModel(CustomerServiceChat.name)
    private chatModel: Model<CustomerServiceChatDocument>,
    private apiService: ApiService<CustomerServiceChatDocument, FindQuery>,
    private customerServiceMsg: CustomerServiceMessageService,
    private eventEmitter: EventEmitter2,
  ) {}
  async createChat(user: string) {
    const chatExist = await this.chatModel
      .findOne({ user })
      .populate('lastMessage');
    if (chatExist) {
      const { messages } = await this.customerServiceMsg.chatMessages(
        chatExist._id.toString(),
        user,
      );
      return { chat: chatExist, messages };
    }
    const chat = await this.chatModel.create({ user });
    this.eventEmitter.emit(emittedEvents.AdminChatJoined, {
      chat: chat._id.toString(),
      user,
      role: All_Role.User,
    });
    return { chat, messages: [] };
  }
  async getChatMemebers(user: string) {
    const chat = await this.chatModel
      .findOne({ user })
      .populate(['user', 'customer_service']);
    if (!chat) {
      throw new HttpException('No chat found', 400);
    }
    return { admin: chat.customer_service, user: chat.user };
  }
  async getChats(obj: FindQuery) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.chatModel.find(),
      obj,
    );
    const chats = await query
      .populate({
        path: 'lastMessage',
      })
      .populate('user');
    return { chats, pagination: paginationObj };
  }
}
