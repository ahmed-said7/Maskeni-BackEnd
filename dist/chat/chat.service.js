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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const chat_schema_1 = require("./chat.schema");
const user_schema_1 = require("../user/user.schema");
const api_service_1 = require("../common/Api/api.service");
const message_service_1 = require("../message/message.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const enum_1 = require("../common/enum");
let ChatService = class ChatService {
    constructor(chatModel, userModel, apiService, msgService, eventEmitter) {
        this.chatModel = chatModel;
        this.userModel = userModel;
        this.apiService = apiService;
        this.msgService = msgService;
        this.eventEmitter = eventEmitter;
    }
    async createChat(body, user) {
        body.admin = user;
        const userExist = await this.userModel.findOne({ _id: body.user });
        if (!userExist) {
            throw new common_1.HttpException('user not found', 400);
        }
        const chatExist = await this.chatModel.findOne({
            $or: [
                { user: body.admin, admin: body.user },
                { admin: body.admin, user: body.user },
            ],
        });
        if (chatExist) {
            const result = await this.msgService.getChatMessages(chatExist._id.toString(), user);
            return { chat: chatExist, ...result };
        }
        const chat = await this.chatModel.create(body);
        this.eventEmitter.emit(enum_1.emittedEvents.UserJoined, {
            chat: chat._id.toString(),
            user,
        });
        return { chat, messages: [] };
    }
    async getChats(obj, user) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.chatModel.find(), obj, {
            $or: [{ user: user }, { admin: user }],
        });
        const chats = await query
            .populate({
            path: 'lastMessage',
            populate: {
                path: 'user',
                model: user_schema_1.User.name,
            },
        })
            .populate('user')
            .populate('admin');
        return { chats, pagination: paginationObj };
    }
    async deleteChat(chatId, user) {
        const chatExist = await this.chatModel.findOne({
            $or: [
                { _id: chatId, user: user },
                { _id: chatId, admin: user },
            ],
        });
        if (!chatExist) {
            throw new common_1.HttpException('chat not found', 400);
        }
        await chatExist.deleteOne();
        return { status: 'deleted' };
    }
    async getChatMemebers(chatId, user) {
        const chat = await this.chatModel
            .findOne({
            $or: [
                { _id: chatId, user: user },
                { _id: chatId, admin: user },
            ],
        })
            .populate(['user', 'admin']);
        if (!chat) {
            throw new common_1.HttpException('No chat found', 400);
        }
        return { admin: chat.admin, user: chat.user };
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chat_schema_1.Chat.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        api_service_1.ApiService,
        message_service_1.MessageService,
        event_emitter_1.EventEmitter2])
], ChatService);
//# sourceMappingURL=chat.service.js.map