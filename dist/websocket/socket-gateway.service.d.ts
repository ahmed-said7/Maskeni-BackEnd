import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GatewayMap, IAuthSocket } from './session-gateway.service';
import { UserDocument } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { CustomerServiceChatDocument } from 'src/customer-service-chat/customer-service-chat.schema';
import { CustomerServiceMessageDocument } from 'src/customer-service-message/customer-service-message.schema';
export declare class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private gatewayMap;
    private UserModel;
    private CustomerChatModel;
    private CustomerMessageModel;
    constructor(gatewayMap: GatewayMap, UserModel: Model<UserDocument>, CustomerChatModel: Model<CustomerServiceChatDocument>, CustomerMessageModel: Model<CustomerServiceMessageDocument>);
    handleConnection(client: IAuthSocket): Promise<void>;
    handleDisconnect(socket: IAuthSocket): Promise<void>;
    server: Server;
    onOnlineUsers(socket: IAuthSocket): Promise<void>;
    onChatLeave(socket: IAuthSocket, { chat }: {
        chat: string;
    }): Promise<void>;
    onUserJoined({ user, chat }: {
        user: string;
        chat: string;
    }): Promise<void>;
    onMessageCreated({ message, sender, recipient, chat, }: {
        sender: string;
        recipient: string;
        chat: string;
        message: any;
    }): Promise<void>;
    onChatAdminJoined({ chat, user, role, }: {
        user: string;
        chat: string;
        role: string;
    }): Promise<void>;
    onChatAdminMsgCreated({ chat, user, admin, message, }: {
        chat: string;
        user: string;
        admin: string;
        message: any;
    }): Promise<void>;
}
