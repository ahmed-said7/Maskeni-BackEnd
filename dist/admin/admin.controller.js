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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const types_1 = require("../common/types");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    getAdmins(query) {
        return this.adminService.getAllAdmins(query);
    }
    deleteAdmin(adminId) {
        return this.adminService.deleteUser(adminId);
    }
    getAdmin(adminId) {
        return this.adminService.getUser(adminId);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAdmins", null);
__decorate([
    (0, common_1.Delete)(':adminId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin),
    __param(0, (0, common_1.Param)('adminId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteAdmin", null);
__decorate([
    (0, common_1.Get)(':adminId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.SuperAdmin),
    __param(0, (0, common_1.Param)('adminId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAdmin", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin/control'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map