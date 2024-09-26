"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const jsonwebtoken_1 = require("jsonwebtoken");
class WebsocketAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.use(async (socket, next) => {
            const token = socket.handshake.headers.authorization;
            if (!token)
                return next(new Error('No token provided'));
            if (!token.startsWith('Bearer ')) {
                return next(new Error('token must be a Bearer token'));
            }
            let decoded;
            try {
                decoded = (0, jsonwebtoken_1.verify)(token.split(' ')[1], process.env.access_secret);
            }
            catch (e) {
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
exports.WebsocketAdapter = WebsocketAdapter;
//# sourceMappingURL=gateway.adpter.js.map