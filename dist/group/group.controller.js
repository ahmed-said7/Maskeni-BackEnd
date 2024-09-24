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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const create_group_dto_1 = require("./dto/create.group.dto");
const update_group_dto_1 = require("./dto/update.group.dto");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const types_1 = require("../common/types");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const query_group_dto_1 = require("./dto/query.group.dto");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async getMyDeletedGroups(query, req) {
        const userId = req.userId;
        return this.groupService.getMyDeletedGroups(query, userId);
    }
    async getMyArchivedGroups(query, req) {
        const userId = req.userId;
        return this.groupService.getMyArchivedGroups(query, userId);
    }
    createGroup(body, req) {
        return this.groupService.createGroup(body, req);
    }
    getGroupMembers(req, groupId) {
        return this.groupService.getGroupMembers(groupId, req);
    }
    getGroups(query) {
        return this.groupService.getAllGroups(query);
    }
    getUserGroups(req, query) {
        return this.groupService.getUserGroups(query, req);
    }
    leaveGroup(req, groupId) {
        return this.groupService.leaveGroup(groupId, req.userId);
    }
    joinGroup(req, groupId) {
        return this.groupService.joinGroup(groupId, req.userId);
    }
    deleteGroup(req, groupId) {
        return this.groupService.deleteGroup(groupId, req);
    }
    updateGroup(req, body, groupId) {
        return this.groupService.updateGroup(body, groupId, req);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Get)('deleted'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getMyDeletedGroups", null);
__decorate([
    (0, common_1.Get)('archived'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getMyArchivedGroups", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Get)('member/:groupId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroupMembers", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_group_dto_1.QueryGroupDto]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroups", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_group_dto_1.QueryGroupDto]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getUserGroups", null);
__decorate([
    (0, common_1.Patch)('leave/:groupId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "leaveGroup", null);
__decorate([
    (0, common_1.Patch)('join/:groupId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "joinGroup", null);
__decorate([
    (0, common_1.Delete)(':groupId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('groupId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "deleteGroup", null);
__decorate([
    (0, common_1.Patch)(':groupId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('groupId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_group_dto_1.UpdateGroupDto, String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "updateGroup", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.Controller)('group'),
    __metadata("design:paramtypes", [group_service_1.GroupServices])
], GroupController);
//# sourceMappingURL=group.controller.js.map