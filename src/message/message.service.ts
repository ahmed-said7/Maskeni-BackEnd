import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create.message.dto';
import { Chat, ChatDocument } from 'src/chat/chat.schema';
import { Message, MessageDocument } from './messahe.schema';
import { UpdateMessageDto } from './dto/update.message.dto';
import { QueryMessageDto } from './dto/query.message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private msgModel: Model<MessageDocument>,
  ) {}
  async createMessage(body: CreateMessageDto, user: string) {
    if (!body.content && !body.image) {
      throw new HttpException('content or image is required', 400);
    }
    const chat = await this.validateChat(body.chat, user);
    body.user = user;
    const message = await this.msgModel.create(body);
    await this.chatModel.findByIdAndUpdate(chat.id, {
      lastMessage: message._id,
    });
    return { message };
  }
  async deleteMessage(messageId: string, user: string) {
    const message = await this.msgModel.findById(messageId);
    if (!message) {
      throw new HttpException('message not found', 400);
    }
    if (message.user.toString() != user) {
      throw new HttpException('you are not message sender', 400);
    }
    message.isDeleted = true;
    await message.save();
    return { status: 'deleted' };
  }
  async updateMessage(messageId: string, body: UpdateMessageDto, user: string) {
    const message = await this.msgModel.findById(messageId);
    if (!message) {
      throw new HttpException('message not found', 400);
    }
    if (message.user.toString() != user) {
      throw new HttpException('you are not message sender', 400);
    }
    const updated = await this.msgModel.findByIdAndUpdate(messageId, body, {
      new: true,
    });
    return { status: 'updated', message: updated };
  }
  private async validateChat(chatId: string, user: string) {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) {
      throw new HttpException('chat not found', 400);
    }
    if (chat.user.toString() != user && chat.admin.toString() != user) {
      throw new HttpException('you are not chat member', 400);
    }
    return chat;
  }
  async getChatMessages(chatId: string, user: string) {
    const chat = await this.validateChat(chatId, user);
    const sender =
      chat.user.toString() == user
        ? chat.admin.toString()
        : chat.user.toString();
    await this.msgModel.updateMany({ user: sender }, { seen: true });
    const messages = await this.msgModel
      .find({
        chat: chatId,
      })
      .sort('-createdAt')
      .populate('user')
      .limit(20);
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
      .populate('user')
      .skip(skip)
      .limit(limit);
    return { messages, page };
  }
}
