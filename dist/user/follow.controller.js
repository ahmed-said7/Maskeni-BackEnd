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
exports.UserFollowController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const enum_1 = require("../common/enum");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const types_1 = require("../common/types");
let UserFollowController = class UserFollowController {
    constructor(userService) {
        this.userService = userService;
    }
    addFollow(req, id) {
        return this.userService.addFollow(id, req.userId);
    }
    removeFollow(req, id) {
        return this.userService.removeFollow(id, req.userId);
    }
    getFollowers(id, query) {
        return this.userService.getUserFollowers(id, query);
    }
    getFollowing(id, query) {
        return this.userService.getUserFollwing(id, query);
    }
};
exports.UserFollowController = UserFollowController;
__decorate([
    (0, common_1.Post)(':user'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('user', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserFollowController.prototype, "addFollow", null);
__decorate([
    (0, common_1.Delete)(':user'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('user', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserFollowController.prototype, "removeFollow", null);
__decorate([
    (0, common_1.Get)('follower/:user'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('user', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], UserFollowController.prototype, "getFollowers", null);
__decorate([
    (0, common_1.Get)('following/:user'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('user', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], UserFollowController.prototype, "getFollowing", null);
exports.UserFollowController = UserFollowController = __decorate([
    (0, common_1.Controller)('user/follow'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserFollowController);
//# sourceMappingURL=follow.controller.js.map