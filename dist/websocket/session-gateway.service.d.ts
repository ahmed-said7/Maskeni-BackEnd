import { Socket } from 'socket.io';
export interface IAuthSocket extends Socket {
  userId?: string;
  type?: string;
}
export declare class GatewayMap {
  private readonly admins;
  private readonly users;
  getAdminSocket(id: string): IAuthSocket;
  setAdminSocket(userId: string, socket: IAuthSocket): void;
  removeAdminSocket(userId: string): void;
  getUserSocket(id: string): IAuthSocket;
  setUserSocket(userId: string, socket: IAuthSocket): void;
  removeUserSocket(userId: string): void;
}
