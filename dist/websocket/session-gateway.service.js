"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayMap = void 0;
const common_1 = require("@nestjs/common");
let GatewayMap = class GatewayMap {
    constructor() {
        this.admins = new Map();
        this.users = new Map();
        this.ids = [];
    }
    getAdminSocket(id) {
        return this.admins.get(id);
    }
    setAdminSocket(userId, socket) {
        this.admins.set(userId, socket);
    }
    removeAdminSocket(userId) {
        this.ids.splice(this.ids.indexOf(userId), 1);
        this.admins.delete(userId);
    }
    getUserSocket(id) {
        this.ids.push(id);
        return this.users.get(id);
    }
    getIds() {
        return this.ids;
    }
    setUserSocket(userId, socket) {
        this.users.set(userId, socket);
    }
    removeUserSocket(userId) {
        this.users.delete(userId);
    }
};
exports.GatewayMap = GatewayMap;
exports.GatewayMap = GatewayMap = __decorate([
    (0, common_1.Injectable)()
], GatewayMap);
//# sourceMappingURL=session-gateway.service.js.map