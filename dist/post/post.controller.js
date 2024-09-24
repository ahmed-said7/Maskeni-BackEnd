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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_create_dto_1 = require("./dto/post.create.dto");
const post_update_dto_1 = require("./dto/post.update.dto");
const validate_mongo_pipe_1 = require("../common/pipe/validate.mongo.pipe");
const types_1 = require("../common/types");
const create_comment_dto_1 = require("../comment/dto/create.comment.dto");
const authentication_guard_1 = require("../common/guards/authentication.guard");
const authorization_guard_1 = require("../common/guards/authorization.guard");
const roles_1 = require("../common/decorator/roles");
const enum_1 = require("../common/enum");
const swagger_1 = require("@nestjs/swagger");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async getMyDeletedPosts(query, req) {
        const userId = req.userId;
        return this.postService.getMyDeletedPosts(query, userId);
    }
    async getMyArchivedPosts(query, req) {
        const userId = req.userId;
        return this.postService.getMyArchivedPosts(query, userId);
    }
    async getPostComments(req, postId, query) {
        return this.postService.getComments(postId, req.userId, query);
    }
    async addPostComment(body, req, postId) {
        return this.postService.addComment(body, postId, req.userId);
    }
    async deletePostComment(req, commentId) {
        return this.postService.removeComment(commentId, req.userId);
    }
    async addLike(req, postId) {
        return this.postService.addLike(postId, req.userId);
    }
    async removeLike(req, postId) {
        return this.postService.removeLike(postId, req.userId);
    }
    async getLike(req, postId, query) {
        return this.postService.getLikes(postId, req.userId, query);
    }
    async createPost(req, body) {
        return this.postService.createPost(body, req.userId);
    }
    async getUserGroupsPosts(req, query) {
        return this.postService.getUserGroupsPosts(req.userId, query);
    }
    async getGroupPosts(req, groupId, query) {
        return this.postService.getGroupPosts(groupId, req.userId, query);
    }
    async deletePost(req, postId) {
        return this.postService.deletePost(postId, req.userId);
    }
    async updatePost(req, postId, body) {
        return this.postService.updatePost(body, postId, req.userId);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)('deleted'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get deleted posts for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of deleted posts' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getMyDeletedPosts", null);
__decorate([
    (0, common_1.Get)('archived'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get archived posts for the authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of archived posts' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.FindQuery, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getMyArchivedPosts", null);
__decorate([
    (0, common_1.Get)('comment/:id'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get comments for a specific post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of comments for the post' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, types_1.FindQuery]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostComments", null);
__decorate([
    (0, common_1.Post)('comment/:id'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Add a comment to a specific post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment successfully added' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto, Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "addPostComment", null);
__decorate([
    (0, common_1.Delete)('comment/:commentId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific comment' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Comment successfully deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('commentId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePostComment", null);
__decorate([
    (0, common_1.Post)('likes/:postId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Add a like to a specific post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Like successfully added' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('postId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "addLike", null);
__decorate([
    (0, common_1.Delete)('likes/:postId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a like from a specific post' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Like successfully removed' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('postId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "removeLike", null);
__decorate([
    (0, common_1.Get)('likes/:postId'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get likes for a specific post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of likes for the post' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('postId', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, types_1.FindQuery]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getLike", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post successfully created' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_create_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('my-groups'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: "Get posts for the user's groups" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of posts in user groups' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.FindQuery]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getUserGroupsPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Get posts for a specific group' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of posts in the specified group',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, types_1.FindQuery]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getGroupPosts", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a specific post' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Post successfully deleted' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard),
    (0, roles_1.Roles)(enum_1.All_Role.User),
    (0, swagger_1.ApiOperation)({ summary: 'Update a specific post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post successfully updated' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', validate_mongo_pipe_1.ValidateObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, post_update_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiTags)('posts'),
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map