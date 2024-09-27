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
exports.CustomerServiceMessageController = void 0;
const common_1 = require("@nestjs/common");
const create_message_dto_1 = require("./dto/create.message.dto");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const query_message_dto_1 = require("./dto/query.message.dto");
const customer_service_message_service_1 = require("./customer-service-message.service");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const swagger_1 = require("@nestjs/swagger");
let CustomerServiceMessageController = class CustomerServiceMessageController {
    constructor(msgService) {
        this.msgService = msgService;
    }
    createMessage(body, req) {
        return this.msgService.createMessage(body, req.userId, req.role);
    }
    adminMessage(user, req, body) {
        return this.msgService.sendMessageByAdmin(body, user, req.userId);
    }
    onScroll(chatId, req, query) {
        return this.msgService.onScroll(chatId, req.userId, query);
    }
    joinAdmin(chatId, req) {
        return this.msgService.joinChatByAdmin(chatId, req.userId);
    }
};
exports.CustomerServiceMessageController = CustomerServiceMessageController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User, enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message created successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", void 0)
], CustomerServiceMessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Post)('admin-msg/:user'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiParam)({ name: 'user', description: 'ID of the user to send message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Message sent by admin.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('user', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_message_dto_1.CreateAdminMessageDto]),
    __metadata("design:returntype", void 0)
], CustomerServiceMessageController.prototype, "adminMessage", null);
__decorate([
    (0, common_1.Get)('scroll/:chatId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User, enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiParam)({
        name: 'chatId',
        description: 'ID of the chat for scrolling messages',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        required: false,
        description: 'Offset for pagination',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Messages scrolled successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('chatId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, query_message_dto_1.QueryMessageDto]),
    __metadata("design:returntype", void 0)
], CustomerServiceMessageController.prototype, "onScroll", null);
__decorate([
    (0, common_1.Get)('admin-join/:chatId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    (0, swagger_1.ApiParam)({ name: 'chatId', description: 'ID of the chat to join as admin' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin joined chat successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('chatId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CustomerServiceMessageController.prototype, "joinAdmin", null);
exports.CustomerServiceMessageController = CustomerServiceMessageController = __decorate([
    (0, swagger_1.ApiTags)('Customer Service Message'),
    (0, common_1.Controller)('customer-service-message'),
    __metadata("design:paramtypes", [customer_service_message_service_1.CustomerServiceMessageService])
], CustomerServiceMessageController);
//# sourceMappingURL=customer-service-message.controller.js.map