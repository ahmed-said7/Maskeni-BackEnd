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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./post.schema");
const group_schema_1 = require("../group/group.schema");
const api_service_1 = require("../common/Api/api.service");
const reaction_service_1 = require("../reaction/reaction.service");
const enum_1 = require("../common/enum");
const user_schema_1 = require("../user/user.schema");
const likes_service_1 = require("../likes/likes.service");
const comment_service_1 = require("../comment/comment.service");
let PostService = class PostService {
    constructor(postModel, groupModel, userModel, reactionService, apiService, likesService, commentService) {
        this.postModel = postModel;
        this.groupModel = groupModel;
        this.userModel = userModel;
        this.reactionService = reactionService;
        this.apiService = apiService;
        this.likesService = likesService;
        this.commentService = commentService;
        this.reactionService.setModel(this.postModel);
    }
    async createPost(body, user) {
        body.user = user;
        await this.validateGroup(body.group, user);
        const post = await this.postModel.create(body);
        return { post };
    }
    async deletePost(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        const groupExist = await this.groupModel.findOne({
            _id: post.group,
        });
        if (groupExist.admin.toString() == user.toString()) {
            post.isDeleted = true;
            await post.save();
            return { status: 'deleted' };
        }
        if (user != post.user.toString()) {
            throw new common_1.HttpException('you are not post owner', 400);
        }
        post.isDeleted = true;
        await post.save();
        return { status: 'deleted' };
    }
    async updatePost(body, postId, user) {
        const post = await this.postModel.findOne({
            _id: postId,
            user,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        const updated = await this.postModel.findByIdAndUpdate(postId, body, {
            new: true,
        });
        return { status: 'updated', post: updated };
    }
    async getGroupPosts(groupId, user, obj) {
        await this.validateGroup(groupId, user);
        const { query, paginationObj } = await this.apiService.getAllDocs(this.postModel.find(), obj, {
            group: groupId,
        });
        const posts = await query.populate({
            path: 'user',
            model: 'User',
            select: 'name mobile icon',
        });
        return { posts, pagination: paginationObj };
    }
    async getUserGroupsPosts(user, obj) {
        const groups = await this.groupModel.find({
            users: user,
        });
        const ids = groups.map(({ _id }) => _id.toString());
        const { query, paginationObj } = await this.apiService.getAllDocs(this.postModel.find(), obj, {
            group: { $in: ids },
        });
        const posts = await query
            .populate({
            path: 'user',
            model: 'User',
            select: 'name mobile icon',
        })
            .populate({ path: 'group', model: 'Group', select: 'name image' });
        return { posts, pagination: paginationObj };
    }
    async addLike(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return this.reactionService.createLike(postId, user);
    }
    async validateGroup(groupId, user) {
        let groupExist = await this.groupModel.findOne({
            _id: groupId,
        });
        if (!groupExist) {
            throw new common_1.HttpException('group not found', 400);
        }
        if (groupExist.privacy == enum_1.Group_Privacy.Public) {
            return groupExist;
        }
        groupExist = await this.groupModel.findOne({
            _id: groupId,
            users: user,
            privacy: enum_1.Group_Privacy.Private,
        });
        if (!groupExist) {
            throw new common_1.HttpException('you are not a member of this group', 400);
        }
        return groupExist;
    }
    async removeLike(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return this.reactionService.deleteLike(postId, user);
    }
    async getLikes(postId, user, query) {
        const post = await this.postModel.findOne({
            _id: postId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return this.likesService.getPostLikes(post.likes, query);
    }
    async addComment(body, postId, user) {
        const post = await this.postModel.findOne({
            _id: postId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        body.user = user;
        body.post = postId;
        const comment = await this.reactionService.createComment(body);
        await this.postModel.findByIdAndUpdate(body.post, {
            $addToSet: { comments: comment._id },
            $inc: { commentCount: 1 },
        });
        return comment;
    }
    async removeComment(commentId, user) {
        return this.reactionService.deleteComment(commentId, user);
    }
    async getComments(postId, user, query) {
        const post = await this.postModel.findOne({
            _id: postId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return this.commentService.getPostComments(post.comments, query);
    }
    async addSaved(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        await this.userModel.findByIdAndUpdate(user, {
            $addToSet: { savedGroupPost: { post: postId } },
        });
        return { status: 'saved added post' };
    }
    async deleteSaved(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        await this.userModel.findByIdAndUpdate(user, {
            $pull: { savedGroupPost: { post: postId } },
        });
        return { status: 'saved deleted post' };
    }
    async getAllSaved(postId, user, query) {
        const post = await this.postModel.findOne({
            _id: postId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return this.reactionService.getAllSaved(query, postId);
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(1, (0, mongoose_1.InjectModel)(group_schema_1.Group.name)),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        reaction_service_1.ReactionService,
        api_service_1.ApiService,
        likes_service_1.LikesService,
        comment_service_1.CommentService])
], PostService);
//# sourceMappingURL=post.service.js.map