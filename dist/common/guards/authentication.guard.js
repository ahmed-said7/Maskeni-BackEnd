"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = __importStar(require("jsonwebtoken"));
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const admin_schema_1 = require("../../admin/admin.schema");
let AuthenticationGuard = class AuthenticationGuard {
    constructor(userModel, config) {
        this.userModel = userModel;
        this.config = config;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return this.extractToken(request);
    }
    async extractToken(request) {
        let token = request.headers.authorization;
        if (!token || !token.startsWith('Bearer')) {
            throw new common_1.UnauthorizedException('Authorization header is missing');
        }
        token = token.split(' ')[1];
        const { userId, role, country, city, quarter } = await this.decode(token, this.config.get('access_secret'));
        request.userId = userId;
        request.role = role;
        request.country = country;
        request.city = city;
        request.quarter = quarter;
        return true;
    }
    async decode(token, secret) {
        let payload;
        try {
            payload = jwt.verify(token, secret);
        }
        catch (e) {
            throw new common_1.UnauthorizedException('invalid token');
        }
        return {
            userId: payload.userId,
            role: payload.role,
            country: payload.country,
            city: payload.city,
            quarter: payload.quarter,
        };
    }
};
exports.AuthenticationGuard = AuthenticationGuard;
exports.AuthenticationGuard = AuthenticationGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(admin_schema_1.Admin.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], AuthenticationGuard);
//# sourceMappingURL=authentication.guard.js.map