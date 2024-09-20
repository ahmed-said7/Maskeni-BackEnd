import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create.chat';
import { Chat, ChatDocument } from './chat.schema';
import { User, UserDocument } from 'src/user/user.schema';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';
import { MessageService } from 'src/message/message.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { emittedEvents } from 'src/common/enum';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private apiService: ApiService<ChatDocument, FindQuery>,
    private msgService: MessageService,
    private eventEmitter: EventEmitter2,
  ) {}
  async createChat(body: CreateChatDto, user: string) {
    body.admin = user;
    const userExist = await this.userModel.findOne({ _id: body.user });
    if (!userExist) {
      throw new HttpException('user not found', 400);
    }
    const chatExist = await this.chatModel.findOne({
      $or: [
        { user: body.admin, admin: body.user },
        { admin: body.admin, user: body.user },
      ],
    });
    if (chatExist) {
      const result = await this.msgService.getChatMessages(
        chatExist._id.toString(),
        user,
      );
      return { chat: chatExist, ...result };
    }
    const chat = await this.chatModel.create(body);
    this.eventEmitter.emit(emittedEvents.UserJoined, { chat, user });
    return { chat, messages: [] };
  }
  async getChats(obj: FindQuery, user: string) {
    const { query, paginationObj } = await this.apiService.getAllDocs(
      this.chatModel.find(),
      obj,
      {
        $or: [{ user: user }, { admin: user }],
      },
    );
    const chats = await query
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'user',
          model: User.name,
        },
      })
      .populate('user')
      .populate('admin');
    return { chats, pagination: paginationObj };
  }
  async deleteChat(chatId: string, user: string) {
    const chatExist = await this.chatModel.findOne({
      $or: [
        { _id: chatId, user: user },
        { _id: chatId, admin: user },
      ],
    });
    if (!chatExist) {
      throw new HttpException('chat not found', 400);
    }
    await chatExist.deleteOne();
    return { status: 'deleted' };
  }
  async getChatMemebers(chatId: string, user: string) {
    const chat = await this.chatModel
      .findOne({
        $or: [
          { _id: chatId, user: user },
          { _id: chatId, admin: user },
        ],
      })
      .populate(['user', 'admin']);
    if (!chat) {
      throw new HttpException('No chat found', 400);
    }
    return { admin: chat.admin, user: chat.user };
  }
}
