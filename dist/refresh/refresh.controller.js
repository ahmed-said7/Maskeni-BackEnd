"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshController = void 0;
const common_1 = require("@nestjs/common");
const refresh_service_1 = require("./refresh.service");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const refresh_guard_1 = require("./guards/refresh.guard");
let RefreshController = class RefreshController {
    constructor(AuthService) {
        this.AuthService = AuthService;
    }
    RefreshAdmin(req) {
        return this.AuthService.createAdminTokens(req.userId, req.role);
    }
    RefreshUser(req) {
        return this.AuthService.createUserTokens(req.userId, req.role);
    }
};
exports.RefreshController = RefreshController;
__decorate([
    (0, common_1.Get)('admin'),
    (0, common_1.UseGuards)(refresh_guard_1.RefreshGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.Admin, enum_1.All_Role.SuperAdmin),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RefreshController.prototype, "RefreshAdmin", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.UseGuards)(refresh_guard_1.RefreshGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RefreshController.prototype, "RefreshUser", null);
exports.RefreshController = RefreshController = __decorate([
    (0, common_1.Controller)('refresh'),
    __metadata("design:paramtypes", [refresh_service_1.RefreshService])
], RefreshController);
//# sourceMappingURL=refresh.controller.js.map