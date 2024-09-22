import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GatewayMap, IAuthSocket } from './session-gateway.service';
import { UserDocument } from 'src/user/user.schema';
import { Model } from 'mongoose';
export declare class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private gatewayMap;
    private UserModel;
    private AdminModel;
    constructor(gatewayMap: GatewayMap, UserModel: Model<UserDocument>, AdminModel: Model<UserDocument>);
    handleConnection(client: IAuthSocket): void;
    handleDisconnect(socket: IAuthSocket): Promise<void>;
    server: Server;
}
