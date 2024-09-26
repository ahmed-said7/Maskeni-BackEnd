import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateAdminMessageDto,
  CreateMessageDto,
} from './dto/create.message.dto';
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
import { All_Role, emittedEvents } from 'src/common/enum';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CustomerServiceMessageService {
  constructor(
    @InjectModel(CustomerServiceChat.name)
    private chatModel: Model<CustomerServiceChatDocument>,
    @InjectModel(CustomerServiceMessage.name)
    private msgModel: Model<CustomerServiceMessageDocument>,
    private eventEmitter: EventEmitter2,
  ) {}
  async createMessage(body: CreateMessageDto, user: string, role: string) {
    const chat = await this.validateChat(body.chat, user);
    if (!body.content && !body.image) {
      throw new HttpException('content or image is required', 400);
    }
    body.user = user;
    body.type = role == All_Role.User ? User.name : Admin.name;
    const message = await this.msgModel.create(body);
    const userId = chat.user.toString();
    const admin = chat.customer_service?.toString();
    const chatExist = await this.chatModel.findByIdAndUpdate(
      chat.id,
      {
        lastMessage: message._id,
      },
      { new: true },
    );
    console.log(chatExist);
    this.eventEmitter.emit(emittedEvents.AdminMessageCreated, {
      chat: chat._id.toString(),
      user: userId,
      admin,
      message,
    });
    return { message };
  }
  async sendMessageByAdmin(
    body: CreateAdminMessageDto,
    user: string,
    admin: string,
  ) {
    let chat = await this.chatModel.findOne({ user });
    if (!chat) {
      chat = await this.chatModel.create({ user });
    }
    body.chat = chat._id.toString();
    body.type = Admin.name;
    body.user = admin;
    await this.msgModel.create(body);
    return { status: 'success! message sent' };
  }
  private handleChatJoin(role: string, user: string, chat: string) {
    this.eventEmitter.emit(emittedEvents.AdminChatJoined, { chat, user, role });
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
  async joinChatByAdmin(chatId: string, user: string) {
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
    this.handleChatJoin(All_Role.Admin, user, chat._id.toString());
    return { messages };
  }
  async joinChatByUser(chatId: string, user: string) {
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
    this.handleChatJoin(All_Role.User, user, chat._id.toString());
    return { messages };
  }
  async onScroll(chatId: string, user: string, query: QueryMessageDto) {
    await this.validateChat(chatId, user);
    const limit = 20;
    const messages = await this.msgModel
      .find({
        chat: chatId,
        createdAt: { $lt: query.after },
      })
      .sort('-createdAt')
      .populate([
        { path: 'user', model: Admin.name, options: { strictPopulate: false } },
        { path: 'user', model: User.name, options: { strictPopulate: false } },
      ])
      .limit(limit);
    return { messages };
  }
}
