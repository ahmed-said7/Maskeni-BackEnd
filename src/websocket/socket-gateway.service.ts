import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GatewayMap, IAuthSocket } from './session-gateway.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { All_Role, emittedEvents } from 'src/common/enum';
import { OnEvent } from '@nestjs/event-emitter';
import {
  CustomerServiceChat,
  CustomerServiceChatDocument,
} from 'src/customer-service-chat/customer-service-chat.schema';
import {
  CustomerServiceMessage,
  CustomerServiceMessageDocument,
} from 'src/customer-service-message/customer-service-message.schema';

@WebSocketGateway({
  cors: {
    origin: ['*'],
    credentials: true,
  },
})
export class MessagingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private gatewayMap: GatewayMap,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(CustomerServiceChat.name)
    private CustomerChatModel: Model<CustomerServiceChatDocument>,
    @InjectModel(CustomerServiceMessage.name)
    private CustomerMessageModel: Model<CustomerServiceMessageDocument>,
  ) {}
  async handleConnection(client: IAuthSocket) {
    if (client.type == All_Role.User) {
      this.gatewayMap.setUserSocket(client.userId, client);
      const chat = await this.CustomerChatModel.findById(client.userId);
      if (!chat) return;
      const msgs = await this.CustomerMessageModel.find({
        chat: chat._id,
        seen: false,
      });
      if (msgs.length == 0) return;
      client.emit('customer:msgs', { msgs });
    } else {
      const room = 'admin:room';
      client.join(room);
      this.gatewayMap.setAdminSocket(client.userId, client);
    }
  }
  async handleDisconnect(socket: IAuthSocket) {
    if (socket.type == All_Role.User) {
      this.server
        .to('admin:room')
        .emit('user:disconnect', { id: socket.userId });
      this.gatewayMap.removeUserSocket(socket.userId);
    } else {
      await this.CustomerChatModel.updateMany(
        { customer_service: socket.userId },
        { isBusy: true, customer_service: null },
      );
      this.gatewayMap.removeUserSocket(socket.userId);
    }
  }
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('online:users')
  async onOnlineUsers(@ConnectedSocket() socket: IAuthSocket) {
    const users = await this.UserModel.find({
      _id: { $in: this.gatewayMap.getIds() },
    });
    socket.emit('online:users', users);
  }
  @SubscribeMessage('chat:leave')
  async onChatLeave(
    @ConnectedSocket() socket: IAuthSocket,
    @MessageBody() { chat }: { chat: string },
  ) {
    const room = `chat:room:${chat}`;
    if (socket.rooms.has(room)) {
      socket.leave(room);
    }
    const chatExist = await this.CustomerChatModel.findById(chat);
    if (chatExist && socket.type !== All_Role.User) {
      chatExist.isBusy = false;
      chatExist.customer_service = null;
      await chatExist.save();
    }
  }
  @OnEvent(emittedEvents.UserJoined)
  async onUserJoined({ user, chat }: { user: string; chat: string }) {
    const room = `chat:room:${chat}`;
    const socket = this.gatewayMap.getUserSocket(user);
    if (socket) {
      socket.join(room);
    }
  }
  @OnEvent(emittedEvents.MessageCreated)
  async onMessageCreated({
    message,
    sender,
    recipient,
    chat,
  }: {
    sender: string;
    recipient: string;
    chat: string;
    message: any;
  }) {
    const room = `chat:room:${chat}`;
    const senderSocket = this.gatewayMap.getUserSocket(sender);
    const recipientSocket = this.gatewayMap.getUserSocket(recipient);
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
  @OnEvent(emittedEvents.AdminChatJoined)
  async onChatAdminJoined({
    chat,
    user,
    role,
  }: {
    user: string;
    chat: string;
    role: string;
  }) {
    const room = `chat:room:${chat}`;
    if (role == All_Role.User) {
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
  @OnEvent(emittedEvents.AdminMessageCreated)
  async onChatAdminMsgCreated({
    chat,
    user,
    admin,
    message,
  }: {
    chat: string;
    user: string;
    admin: string;
    message: any;
  }) {
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
}
