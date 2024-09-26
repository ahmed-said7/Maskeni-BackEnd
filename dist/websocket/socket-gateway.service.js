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
exports.MessagingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const session_gateway_service_1 = require("./session-gateway.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/user.schema");
const mongoose_2 = require("mongoose");
const enum_1 = require("../common/enum");
const event_emitter_1 = require("@nestjs/event-emitter");
const customer_service_chat_schema_1 = require("../customer-service-chat/customer-service-chat.schema");
const customer_service_message_schema_1 = require("../customer-service-message/customer-service-message.schema");
let MessagingGateway = class MessagingGateway {
    constructor(gatewayMap, UserModel, CustomerChatModel, CustomerMessageModel) {
        this.gatewayMap = gatewayMap;
        this.UserModel = UserModel;
        this.CustomerChatModel = CustomerChatModel;
        this.CustomerMessageModel = CustomerMessageModel;
    }
    async handleConnection(client) {
        console.log(client.type);
        if (client.type == enum_1.All_Role.User) {
            this.gatewayMap.setUserSocket(client.userId, client);
            const chat = await this.CustomerChatModel.findById(client.userId);
            if (!chat)
                return;
            const msgs = await this.CustomerMessageModel.find({
                chat: chat._id,
                seen: false,
            });
            if (msgs.length == 0)
                return;
            client.emit('customer:msgs', { msgs });
        }
        else {
            const room = 'admin:room';
            client.join(room);
            this.gatewayMap.setAdminSocket(client.userId, client);
        }
    }
    async handleDisconnect(socket) {
        if (socket.type == enum_1.All_Role.User) {
            this.server
                .to('admin:room')
                .emit('user:disconnect', { id: socket.userId });
            this.gatewayMap.removeUserSocket(socket.userId);
        }
        else {
            await this.CustomerChatModel.updateMany({ customer_service: socket.userId }, { isBusy: true, customer_service: null });
            this.gatewayMap.removeUserSocket(socket.userId);
        }
    }
    async onOnlineUsers(socket) {
        const users = await this.UserModel.find({
            _id: { $in: this.gatewayMap.getIds() },
        });
        socket.emit('online:users', users);
    }
    async onChatLeave(socket, { chat }) {
        const room = `chat:room:${chat}`;
        if (socket.rooms.has(room)) {
            socket.leave(room);
        }
        const chatExist = await this.CustomerChatModel.findById(chat);
        if (chatExist && socket.type !== enum_1.All_Role.User) {
            chatExist.isBusy = false;
            chatExist.customer_service = null;
            await chatExist.save();
        }
    }
    async onUserJoined({ user, chat }) {
        const room = `chat:room:${chat}`;
        const socket = this.gatewayMap.getUserSocket(user);
        if (socket) {
            socket.join(room);
        }
    }
    async onMessageCreated({ message, sender, recipient, chat, }) {
        const room = `chat:room:${chat}`;
        const senderSocket = this.gatewayMap.getUserSocket(sender);
        const recipientSocket = this.gatewayMap.getUserSocket(recipient);
        console.log(senderSocket.userId, recipientSocket.userId);
        if (this.server.sockets.adapter.rooms.has(room)) {
            this.server.to(room).emit('on:chat:message', { message, chat });
        }
        if (senderSocket && !senderSocket.rooms.has(room)) {
            senderSocket.emit('chat:message', { message, chat });
        }
        if (recipientSocket && !recipientSocket.rooms.has(room)) {
            recipientSocket.emit('chat:message', { message, chat });
        }
    }
    async onChatAdminJoined({ chat, user, role, }) {
        const room = `chat:room:${chat}`;
        if (role == enum_1.All_Role.User) {
            const socket = this.gatewayMap.getUserSocket(user);
            if (socket) {
                socket.join(room);
            }
            return;
        }
        const socket = this.gatewayMap.getAdminSocket(user);
        if (socket) {
            socket.join(room);
        }
    }
    async onChatAdminMsgCreated({ chat, user, admin, message, }) {
        const room = `chat:room:${chat}`;
        const senderSocket = this.gatewayMap.getUserSocket(user);
        const recipientSocket = this.gatewayMap.getUserSocket(admin);
        if (this.server.sockets.adapter.rooms.has(room)) {
            this.server.to(room).emit('on:chat:customer:message', { message, chat });
        }
        if (senderSocket && !senderSocket.rooms.has(room)) {
            senderSocket.emit('chat:customer:message', { message, chat });
        }
        if (recipientSocket && !recipientSocket.rooms.has(room)) {
            recipientSocket.emit('chat:customer:message', { message, chat });
        }
    }
};
exports.MessagingGateway = MessagingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('online:users'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "onOnlineUsers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('chat:leave'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "onChatLeave", null);
__decorate([
    (0, event_emitter_1.OnEvent)(enum_1.emittedEvents.UserJoined),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "onUserJoined", null);
__decorate([
    (0, event_emitter_1.OnEvent)(enum_1.emittedEvents.MessageCreated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "onMessageCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)(enum_1.emittedEvents.AdminChatJoined),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "onChatAdminJoined", null);
__decorate([
    (0, event_emitter_1.OnEvent)(enum_1.emittedEvents.AdminMessageCreated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingGateway.prototype, "onChatAdminMsgCreated", null);
exports.MessagingGateway = MessagingGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ['*'],
            credentials: true,
        },
    }),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(customer_service_chat_schema_1.CustomerServiceChat.name)),
    __param(3, (0, mongoose_1.InjectModel)(customer_service_message_schema_1.CustomerServiceMessage.name)),
    __metadata("design:paramtypes", [session_gateway_service_1.GatewayMap,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], MessagingGateway);
//# sourceMappingURL=socket-gateway.service.js.map