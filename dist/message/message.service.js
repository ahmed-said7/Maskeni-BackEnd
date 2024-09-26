"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("../chat/chat.schema");
const messahe_schema_1 = require("./messahe.schema");
const event_emitter_1 = require("@nestjs/event-emitter");
const enum_1 = require("../common/enum");
let MessageService = class MessageService {
    constructor(chatModel, msgModel, eventEmitter) {
        this.chatModel = chatModel;
        this.msgModel = msgModel;
        this.eventEmitter = eventEmitter;
    }
    async createMessage(body, user) {
        if (!body.content && !body.image) {
            throw new common_1.HttpException('content or image is required', 400);
        }
        const chat = await this.validateChat(body.chat, user);
        body.user = user;
        const message = await this.msgModel.create(body);
        await this.chatModel.findByIdAndUpdate(chat.id, {
            lastMessage: message._id,
        });
        const sender = chat.user.toString();
        const recipient = chat.admin.toString();
        this.eventEmitter.emit(enum_1.emittedEvents.MessageCreated, {
            message,
            sender,
            recipient,
            chat: chat._id.toString(),
        });
        return { message };
    }
    async deleteMessage(messageId, user) {
        const message = await this.msgModel.findById(messageId);
        if (!message) {
            throw new common_1.HttpException('message not found', 400);
        }
        if (message.user.toString() != user) {
            throw new common_1.HttpException('you are not message sender', 400);
        }
        message.isDeleted = true;
        await message.save();
        return { status: 'deleted' };
    }
    async updateMessage(messageId, body, user) {
        const message = await this.msgModel.findById(messageId);
        if (!message) {
            throw new common_1.HttpException('message not found', 400);
        }
        if (message.user.toString() != user) {
            throw new common_1.HttpException('you are not message sender', 400);
        }
        const updated = await this.msgModel.findByIdAndUpdate(messageId, body, {
            new: true,
        });
        return { status: 'updated', message: updated };
    }
    async validateChat(chatId, user) {
        const chat = await this.chatModel.findById(chatId);
        if (!chat) {
            throw new common_1.HttpException('chat not found', 400);
        }
        if (chat.user.toString() != user && chat.admin.toString() != user) {
            throw new common_1.HttpException('you are not chat member', 400);
        }
        return chat;
    }
    async getChatMessages(chatId, user) {
        const chat = await this.validateChat(chatId, user);
        const sender = chat.user.toString() == user
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
        this.eventEmitter.emit(enum_1.emittedEvents.UserJoined, {
            user,
            chat: chatId,
        });
        return { messages };
    }
    async onScroll(chatId, user, query) {
        await this.validateChat(chatId, user);
        const limit = 20;
        console.log(query.after);
        const messages = await this.msgModel
            .find({
            chat: chatId,
            createdAt: { $lt: query.after },
        })
            .sort('-createdAt')
            .populate('user')
            .limit(limit);
        return { messages };
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __param(1, (0, mongoose_1.InjectModel)(messahe_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        event_emitter_1.EventEmitter2])
], MessageService);
//# sourceMappingURL=message.service.js.map