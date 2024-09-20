import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GatewayMap, IAuthSocket } from './session-gateway.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { Admin } from 'src/admin/admin.schema';
import { All_Role } from 'src/common/enum';

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
    @InjectModel(Admin.name) private AdminModel: Model<UserDocument>,
    // @InjectModel(Admin.name) private AdminModel: Model<UserDocument>,
    // @InjectModel(Admin.name) private AdminModel: Model<UserDocument>,
  ) {}
  handleConnection(client: IAuthSocket) {
    if (client.type == All_Role.User) {
      this.gatewayMap.setUserSocket(client.userId, client);
    } else {
      this.gatewayMap.setAdminSocket(client.userId, client);
    }
  }
  async handleDisconnect(socket: IAuthSocket) {
    if (socket.type == All_Role.User) {
      this.gatewayMap.removeUserSocket(socket.userId);
    } else {
      this.gatewayMap.removeUserSocket(socket.userId);
    }
  }
  @WebSocketServer()
  server: Server;
}
