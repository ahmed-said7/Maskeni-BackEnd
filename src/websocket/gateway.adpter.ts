import { IoAdapter } from '@nestjs/platform-socket.io';
import { verify } from 'jsonwebtoken';
import { IAuthSocket } from './session-gateway.service';

export class WebsocketAdapter extends IoAdapter {
  createIOServer(port: number, options?: any) {
    const server = super.createIOServer(port, options);
    server.use(async (socket: IAuthSocket, next) => {
      const token = socket.handshake.headers.authorization;
      if (!token) return next(new Error('No token provided'));
      if (!token.startsWith('Bearer ')) {
        return next(new Error('token must be a Bearer token'));
      }
      let decoded;
      try {
        decoded = verify(token.split(' ')[1], process.env.access_secret);
      } catch (e) {
        return next(new Error('Invalid token'));
      }
      console.log(decoded);
      socket.userId = decoded.userId;
      socket.type = decoded.role;
      return next();
    });
    return server;
  }
}
