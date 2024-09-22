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
exports.CustomerServiceMessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_service_chat_schema_1 = require("../customer-service-chat/customer-service-chat.schema");
const customer_service_message_schema_1 = require("./customer-service-message.schema");
const admin_schema_1 = require("../admin/admin.schema");
const user_schema_1 = require("../user/user.schema");
const enum_1 = require("../common/enum");
const event_emitter_1 = require("@nestjs/event-emitter");
let CustomerServiceMessageService = class CustomerServiceMessageService {
    constructor(chatModel, msgModel, eventEmitter) {
        this.chatModel = chatModel;
        this.msgModel = msgModel;
        this.eventEmitter = eventEmitter;
    }
    async createMessage(body, user, role) {
        const chat = await this.validateChat(body.chat, user);
        if (!body.content && !body.image) {
            throw new common_1.HttpException('content or image is required', 400);
        }
        body.user = user;
        body.type = role == enum_1.All_Role.User ? user_schema_1.User.name : admin_schema_1.Admin.name;
        const message = await this.msgModel.create(body);
        const userId = chat.user.toString();
        const admin = chat.customer_service?.toString();
        await this.chatModel.findByIdAndUpdate(chat.id, {
            lastMessage: message._id,
        });
        this.eventEmitter.emit(enum_1.emittedEvents.AdminMessageCreated, {
            chat: chat._id.toString(),
            user: userId,
            admin,
            message,
        });
        return { message };
    }
    async sendMessageByAdmin(body, user, admin) {
        let chat = await this.chatModel.findOne({ user });
        if (!chat) {
            chat = await this.chatModel.create({ user });
        }
        body.chat = chat._id.toString();
        body.type = admin_schema_1.Admin.name;
        body.user = admin;
        await this.msgModel.create(body);
        return { status: 'success! message sent' };
    }
    handleChatJoin(role, user, chat) {
        this.eventEmitter.emit(enum_1.emittedEvents.AdminChatJoined, { chat, user, role });
        return role;
    }
    async validateChat(chatId, user) {
        const chat = await this.chatModel.findById(chatId);
        if (!chat) {
            throw new common_1.HttpException('chat not found', 400);
        }
        if (chat.user.toString() != user &&
            chat.customer_service.toString() != user) {
            throw new common_1.HttpException('you are not chat member', 400);
        }
        return chat;
    }
    async joinChatByAdmin(chatId, user) {
        const chat = await this.chatModel.findOne({
            _id: chatId,
            $or: [{ isBusy: true }, { customer_service: user }],
        });
        if (!chat) {
            throw new common_1.HttpException('chat not found', 400);
        }
        const messages = await this.msgModel
            .find({
            chat: chatId,
        })
            .sort('-createdAt')
            .populate([
            { path: 'user', model: admin_schema_1.Admin.name, options: { strictPopulate: false } },
            { path: 'user', model: user_schema_1.User.name, options: { strictPopulate: false } },
        ])
            .limit(20);
        if (!chat.isBusy) {
            await this.chatModel.findByIdAndUpdate(chatId, {
                isBusy: true,
                customer_service: user,
            });
        }
        this.handleChatJoin(enum_1.All_Role.Admin, user, chat._id.toString());
        return { messages };
    }
    async joinChatByUser(chatId, user) {
        const chat = await this.chatModel.findOne({
            _id: chatId,
            user,
        });
        if (!chat) {
            throw new common_1.HttpException('chat not found', 400);
        }
        const messages = await this.msgModel
            .find({
            chat: chatId,
        })
            .sort('-createdAt')
            .populate([
            { path: 'user', model: admin_schema_1.Admin.name, options: { strictPopulate: false } },
            { path: 'user', model: user_schema_1.User.name, options: { strictPopulate: false } },
        ])
            .limit(20);
        this.handleChatJoin(enum_1.All_Role.User, user, chat._id.toString());
        return { messages };
    }
    async onScroll(chatId, user, query) {
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
            { path: 'user', model: admin_schema_1.Admin.name, options: { strictPopulate: false } },
            { path: 'user', model: user_schema_1.User.name, options: { strictPopulate: false } },
        ])
            .skip(skip)
            .limit(limit);
        return { messages, page };
    }
};
exports.CustomerServiceMessageService = CustomerServiceMessageService;
exports.CustomerServiceMessageService = CustomerServiceMessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(customer_service_chat_schema_1.CustomerServiceChat.name)),
    __param(1, (0, mongoose_1.InjectModel)(customer_service_message_schema_1.CustomerServiceMessage.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        event_emitter_1.EventEmitter2])
], CustomerServiceMessageService);
//# sourceMappingURL=customer-service-message.service.js.map