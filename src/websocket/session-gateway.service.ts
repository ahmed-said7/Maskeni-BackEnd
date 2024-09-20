import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

export interface IAuthSocket extends Socket {
  userId?: string;
  type?: string;
}

@Injectable()
export class GatewayMap {
  private readonly admins: Map<string, IAuthSocket> = new Map();
  private readonly users: Map<string, IAuthSocket> = new Map();
  getAdminSocket(id: string) {
    return this.admins.get(id);
  }

  setAdminSocket(userId: string, socket: IAuthSocket) {
    this.admins.set(userId, socket);
  }
  removeAdminSocket(userId: string) {
    this.admins.delete(userId);
  }
  getUserSocket(id: string) {
    return this.users.get(id);
  }

  setUserSocket(userId: string, socket: IAuthSocket) {
    this.users.set(userId, socket);
  }
  removeUserSocket(userId: string) {
    this.users.delete(userId);
  }
}
