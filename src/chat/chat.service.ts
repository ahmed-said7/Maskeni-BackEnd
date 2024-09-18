import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create.chat';
import { Chat, ChatDocument } from './chat.schema';
import { User, UserDocument } from 'src/user/user.schema';
import { FindQuery } from 'src/common/types';
import { ApiService } from 'src/common/Api/api.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private apiService: ApiService<ChatDocument, FindQuery>,
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
      return { chat: chatExist };
    }
    const chat = await this.chatModel.create(body);
    return { chat };
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
