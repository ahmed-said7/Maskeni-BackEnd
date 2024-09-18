import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create.message.dto';
import { QueryMessageDto } from './dto/query.message.dto';
import {
  CustomerServiceChat,
  CustomerServiceChatDocument,
} from 'src/customer-service-chat/customer-service-chat.schema';
import {
  CustomerServiceMessage,
  CustomerServiceMessageDocument,
} from './customer-service-message.schema';
import { Admin } from 'src/admin/admin.schema';
import { User } from 'src/user/user.schema';
import { All_Role } from 'src/common/enum';

@Injectable()
export class CustomerServiceMessageService {
  constructor(
    @InjectModel(CustomerServiceChat.name)
    private chatModel: Model<CustomerServiceChatDocument>,
    @InjectModel(CustomerServiceMessage.name)
    private msgModel: Model<CustomerServiceMessageDocument>,
  ) {}
  async createMessage(body: CreateMessageDto, user: string, role: string) {
    const chat = await this.validateChat(body.chat, user);
    if (!body.content && !body.image) {
      throw new HttpException('content or image is required', 400);
    }
    body.user = user;
    body.type = role == All_Role.User ? User.name : Admin.name;
    const message = await this.msgModel.create(body);
    await this.chatModel.findByIdAndUpdate(chat.id, {
      lastMessage: message._id,
    });
    this.handleMessageCreated(role);
    return { message };
  }
  private handleMessageCreated(role: string) {
    // socket event
    return role;
  }
  private handleChatJoin(role: string) {
    // socket event
    return role;
  }
  private async validateChat(chatId: string, user: string) {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) {
      throw new HttpException('chat not found', 400);
    }
    if (
      chat.user.toString() != user &&
      chat.customer_service.toString() != user
    ) {
      throw new HttpException('you are not chat member', 400);
    }
    return chat;
  }
  private async validateAdminJoined(chatId: string, user: string) {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) {
      throw new HttpException('chat not found', 400);
    }
    if (
      chat.user.toString() != user &&
      chat.customer_service.toString() != user
    ) {
      throw new HttpException('you are not chat member', 400);
    }
    return chat;
  }
  async joinChatByAdmin(chatId: string, user: string, role: string) {
    const chat = await this.chatModel.findOne({
      _id: chatId,
      $or: [{ isBusy: true }, { customer_service: user }],
    });
    if (!chat) {
      throw new HttpException('chat not found', 400);
    }
    const messages = await this.msgModel
      .find({
        chat: chatId,
      })
      .sort('-createdAt')
      .populate([
        { path: 'user', model: Admin.name, options: { strictPopulate: false } },
        { path: 'user', model: User.name, options: { strictPopulate: false } },
      ])
      .limit(20);
    if (!chat.isBusy) {
      await this.chatModel.findByIdAndUpdate(chatId, {
        isBusy: true,
        customer_service: user,
      });
    }
    this.handleChatJoin(role);
    return { messages };
  }
  async joinChatByUser(chatId: string, user: string, role: string) {
    const chat = await this.chatModel.findOne({
      _id: chatId,
      user,
    });
    if (!chat) {
      throw new HttpException('chat not found', 400);
    }
    const messages = await this.msgModel
      .find({
        chat: chatId,
      })
      .sort('-createdAt')
      .populate([
        { path: 'user', model: Admin.name, options: { strictPopulate: false } },
        { path: 'user', model: User.name, options: { strictPopulate: false } },
      ])
      .limit(20);
    this.handleChatJoin(role);
    return { messages };
  }
  async onScroll(chatId: string, user: string, query: QueryMessageDto) {
    await this.validateChat(chatId, user);
    const page = query.page || 2;
    const limit = 20;
    const skip = (page - 1) * limit;
    const messages = await this.msgModel
      .find({
        chat: chatId,
        createdAt: { $gt: query.after },
      })
      .sort('-createdAt')
      .populate([
        { path: 'user', model: Admin.name, options: { strictPopulate: false } },
        { path: 'user', model: User.name, options: { strictPopulate: false } },
      ])
      .skip(skip)
      .limit(limit);
    return { messages, page };
  }
}
