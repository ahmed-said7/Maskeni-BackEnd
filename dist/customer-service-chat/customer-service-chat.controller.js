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
exports.CustomerServiceChatController = void 0;
const common_1 = require("@nestjs/common");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const customer_service_chat_service_1 = require("./customer-service-chat.service");
const types_1 = require("../common/types");
let CustomerServiceChatController = class CustomerServiceChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    createChat(req) {
        return this.chatService.createChat(req.userId);
    }
    getUserChats(query) {
        return this.chatService.getChats(query);
    }
    getChatMembers(id, req) {
        return this.chatService.getChatMemebers(req.userId);
    }
};
exports.CustomerServiceChatController = CustomerServiceChatController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomerServiceChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], CustomerServiceChatController.prototype, "getUserChats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CustomerServiceChatController.prototype, "getChatMembers", null);
exports.CustomerServiceChatController = CustomerServiceChatController = __decorate([
    (0, common_1.Controller)('customer-service-chat'),
    __metadata("design:paramtypes", [customer_service_chat_service_1.CustomerServiceChatService])
], CustomerServiceChatController);
//# sourceMappingURL=customer-service-chat.controller.js.map