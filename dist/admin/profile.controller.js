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
exports.AdminProfileController = void 0;
const common_1 = require("@nestjs/common");
const update_password_dto_1 = require("./dto/update.password.dto");
const admin_service_1 = require("./admin.service");
const update_user_dto_1 = require("./dto/update.user.dto");
const enum_1 = require("../common/enum");
const roles_1 = require("../common/decorator/roles");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
let AdminProfileController = class AdminProfileController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    updatePassword(body, req) {
        return this.adminService.updatepassword(body, req.userId);
    }
    deleteUser(req) {
        return this.adminService.deleteUser(req.userId);
    }
    getUser(req) {
        return this.adminService.getUser(req.userId);
    }
    updateUser(req, body) {
        return this.adminService.updateUser(body, req.userId);
    }
};
exports.AdminProfileController = AdminProfileController;
__decorate([
    (0, common_1.Patch)('password'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin, enum_1.All_Role.Admin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.UpdatePasswordDto, Object]),
    __metadata("design:returntype", void 0)
], AdminProfileController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin, enum_1.All_Role.Admin),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminProfileController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin, enum_1.All_Role.Admin),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminProfileController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin, enum_1.All_Role.Admin),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminProfileController.prototype, "updateUser", null);
exports.AdminProfileController = AdminProfileController = __decorate([
    (0, common_1.Controller)('admin/profile'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminProfileController);
//# sourceMappingURL=profile.controller.js.map