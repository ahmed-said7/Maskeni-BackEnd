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
exports.ShareController = void 0;
const common_1 = require("@nestjs/common");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const types_1 = require("../common/types");
const share_service_1 = require("./share.service");
const create_share_dto_1 = require("./dto/create.share.dto");
const query_share_dto_1 = require("./dto/query.share.dto");
const update_share_dto_1 = require("./dto/update.share.dto");
const create_comment_dto_1 = require("../comment/dto/create.comment.dto");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const authorization_guard_1 = require("../common/guards/authorization.guard");
let ShareController = class ShareController {
    constructor(shareService) {
        this.shareService = shareService;
    }
    async getMyDeletedShare(query, req) {
        const userId = req.userId;
        return this.shareService.getMyDeletdShare(query, userId);
    }
    async getMyArchivedShare(query, req) {
        const userId = req.userId;
        return this.shareService.getMyArcivedShare(query, userId);
    }
    createShare(body, req) {
        return this.shareService.createShare(body, req.userId);
    }
    getAllShare(query) {
        return this.shareService.getAllShare(query);
    }
    updateShare(shareId, body, req) {
        return this.shareService.updateShare(shareId, body, req.userId);
    }
    deleteShare(shareId, req) {
        return this.shareService.deleteShare(shareId, req.userId);
    }
    createShareComment(shareId, body, req) {
        return this.shareService.addComment(body, shareId, req.userId);
    }
    getShareComment(shareId, query) {
        return this.shareService.getComments(shareId, query);
    }
    deleteShareComment(commentId, req) {
        return this.shareService.removeComment(commentId, req.userId);
    }
    addShareLike(shareId, req) {
        return this.shareService.addLike(shareId, req.userId);
    }
    removeShareLike(shareId, req) {
        return this.shareService.removeLike(shareId, req.userId);
    }
    getShareLikes(shareId, query) {
        return this.shareService.getLikes(shareId, query);
    }
    addSavedShare(shareId, req) {
        return this.shareService.addSaved(shareId, req.userId);
    }
    removeSavedShare(shareId, req) {
        return this.shareService.deleteSaved(shareId, req.userId);
    }
    getSavedShares(shareId, query) {
        return this.shareService.getAllSaved(shareId, query);
    }
    getShare(shareId) {
        return this.shareService.getShare(shareId);
    }
};
exports.ShareController = ShareController;
__decorate([
    (0, common_1.Get)('deleted'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "getMyDeletedShare", null);
__decorate([
    (0, common_1.Get)('archived'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], ShareController.prototype, "getMyArchivedShare", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_share_dto_1.CreateShareDto, Object]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "createShare", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_share_dto_1.QueryShareDto]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "getAllShare", null);
__decorate([
    (0, common_1.Patch)(':shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_share_dto_1.UpdateShareDto, Object]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "updateShare", null);
__decorate([
    (0, common_1.Delete)(':shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "deleteShare", null);
__decorate([
    (0, common_1.Post)('comment/:shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "createShareComment", null);
__decorate([
    (0, common_1.Get)('comment/:shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "getShareComment", null);
__decorate([
    (0, common_1.Delete)('comment/:commentId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('commentId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "deleteShareComment", null);
__decorate([
    (0, common_1.Post)('likes/:shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "addShareLike", null);
__decorate([
    (0, common_1.Delete)('likes/:shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "removeShareLike", null);
__decorate([
    (0, common_1.Get)('likes/:shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "getShareLikes", null);
__decorate([
    (0, common_1.Post)('saved/:shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "addSavedShare", null);
__decorate([
    (0, common_1.Delete)('saved/:shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "removeSavedShare", null);
__decorate([
    (0, common_1.Get)('saved/:shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_share_dto_1.QueryShareDto]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "getSavedShares", null);
__decorate([
    (0, common_1.Get)(':shareId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    __param(0, (0, common_1.Param)('shareId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShareController.prototype, "getShare", null);
exports.ShareController = ShareController = __decorate([
    (0, common_1.Controller)('share'),
    __metadata("design:paramtypes", [share_service_1.ShareService])
], ShareController);
//# sourceMappingURL=share.controller.js.map