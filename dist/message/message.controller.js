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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const create_message_dto_1 = require("./dto/create.message.dto");
const message_service_1 = require("./message.service");
const update_message_dto_1 = require("./dto/update.message.dto");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const query_message_dto_1 = require("./dto/query.message.dto");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const swagger_1 = require("@nestjs/swagger");
let MessageController = class MessageController {
    constructor(msgService) {
        this.msgService = msgService;
    }
    async createMessage(body, req) {
        return this.msgService.createMessage(body, req.userId);
    }
    async onScroll(chatId, req, query) {
        return this.msgService.onScroll(chatId, req.userId, query);
    }
    async getChatMessages(chatId, req) {
        return this.msgService.getChatMessages(chatId, req.userId);
    }
    async updateMessage(body, messageId, req) {
        return this.msgService.updateMessage(messageId, body, req.userId);
    }
    async deleteMessages(messageId, req) {
        return this.msgService.deleteMessage(messageId, req.userId);
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new message' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)('scroll/:chatId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Load more messages for a chat' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages loaded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Chat not found' }),
    __param(0, (0, common_1.Param)('chatId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, query_message_dto_1.QueryMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "onScroll", null);
__decorate([
    (0, common_1.Get)(':chatId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get all messages for a chat' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Chat messages retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Chat not found' }),
    __param(0, (0, common_1.Param)('chatId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getChatMessages", null);
__decorate([
    (0, common_1.Patch)(':messageId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Update a message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Message updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Message not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('messageId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_message_dto_1.UpdateMessageDto, String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Delete)(':messageId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Message deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Message not found' }),
    __param(0, (0, common_1.Param)('messageId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "deleteMessages", null);
exports.MessageController = MessageController = __decorate([
    (0, swagger_1.ApiTags)('messages'),
    (0, common_1.Controller)('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
//# sourceMappingURL=message.controller.js.map