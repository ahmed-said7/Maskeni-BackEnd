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
exports.CustomerServiceChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_service_chat_schema_1 = require("./customer-service-chat.schema");
const api_service_1 = require("../common/Api/api.service");
let CustomerServiceChatService = class CustomerServiceChatService {
    constructor(chatModel, apiService) {
        this.chatModel = chatModel;
        this.apiService = apiService;
    }
    async createChat(user) {
        const chatExist = await this.chatModel
            .findOne({ user })
            .populate('lastMessage');
        if (chatExist) {
            return chatExist;
        }
        const chat = await this.chatModel.create({ user });
        return { chat };
    }
    async getChatMemebers(user) {
        const chat = await this.chatModel
            .findOne({ user })
            .populate(['user', 'customer_service']);
        if (!chat) {
            throw new common_1.HttpException('No chat found', 400);
        }
        return { admin: chat.customer_service, user: chat.user };
    }
    async getChats(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.chatModel.find(), obj);
        const chats = await query
            .populate({
            path: 'lastMessage',
        })
            .populate('user');
        return { chats, pagination: paginationObj };
    }
};
exports.CustomerServiceChatService = CustomerServiceChatService;
exports.CustomerServiceChatService = CustomerServiceChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(customer_service_chat_schema_1.CustomerServiceChat.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_service_1.ApiService])
], CustomerServiceChatService);
//# sourceMappingURL=customer-service-chat.service.js.map