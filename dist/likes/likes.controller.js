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
exports.LikesController = void 0;
const common_1 = require("@nestjs/common");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const likes_service_1 = require("./likes.service");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const types_1 = require("../common/types");
const swagger_1 = require("@nestjs/swagger");
let LikesController = class LikesController {
    constructor(likesService) {
        this.likesService = likesService;
    }
    addLike(commentId, req) {
        return this.likesService.addlikeToComment(commentId, req.userId);
    }
    deleteLike(commentId, req) {
        return this.likesService.removeikeFromComment(commentId, req.userId);
    }
    getCommentLikes(commentId, query) {
        return this.likesService.getCommentLikes(commentId, query);
    }
};
exports.LikesController = LikesController;
__decorate([
    (0, common_1.Post)(':commentId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Add a like to a comment' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Like added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comment not found' }),
    __param(0, (0, common_1.Param)('commentId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "addLike", null);
__decorate([
    (0, common_1.Delete)(':commentId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a like from a comment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Like removed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comment not found' }),
    __param(0, (0, common_1.Param)('commentId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "deleteLike", null);
__decorate([
    (0, common_1.Get)(':commentId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get likes for a specific comment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Likes retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Comment not found' }),
    __param(0, (0, common_1.Param)('commentId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.FindQuery]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "getCommentLikes", null);
exports.LikesController = LikesController = __decorate([
    (0, swagger_1.ApiTags)('likes'),
    (0, common_1.Controller)('likes'),
    __metadata("design:paramtypes", [likes_service_1.LikesService])
], LikesController);
//# sourceMappingURL=likes.controller.js.map