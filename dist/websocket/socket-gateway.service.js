'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.MessagingGateway = void 0;
const websockets_1 = require('@nestjs/websockets');
const socket_io_1 = require('socket.io');
const session_gateway_service_1 = require('./session-gateway.service');
const mongoose_1 = require('@nestjs/mongoose');
const user_schema_1 = require('../user/user.schema');
const mongoose_2 = require('mongoose');
const admin_schema_1 = require('../admin/admin.schema');
const enum_1 = require('../common/enum');
let MessagingGateway = class MessagingGateway {
  constructor(gatewayMap, UserModel, AdminModel) {
    this.gatewayMap = gatewayMap;
    this.UserModel = UserModel;
    this.AdminModel = AdminModel;
  }
  handleConnection(client) {
    if (client.type == enum_1.All_Role.User) {
      this.gatewayMap.setUserSocket(client.userId, client);
    } else {
      this.gatewayMap.setAdminSocket(client.userId, client);
    }
  }
  async handleDisconnect(socket) {
    if (socket.type == enum_1.All_Role.User) {
      this.gatewayMap.removeUserSocket(socket.userId);
    } else {
      this.gatewayMap.removeUserSocket(socket.userId);
    }
  }
};
exports.MessagingGateway = MessagingGateway;
__decorate(
  [
    (0, websockets_1.WebSocketServer)(),
    __metadata('design:type', socket_io_1.Server),
  ],
  MessagingGateway.prototype,
  'server',
  void 0,
);
exports.MessagingGateway = MessagingGateway = __decorate(
  [
    (0, websockets_1.WebSocketGateway)({
      cors: {
        origin: ['*'],
        credentials: true,
      },
    }),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata('design:paramtypes', [
      session_gateway_service_1.GatewayMap,
      mongoose_2.Model,
      mongoose_2.Model,
    ]),
  ],
  MessagingGateway,
);
//# sourceMappingURL=socket-gateway.service.js.map
