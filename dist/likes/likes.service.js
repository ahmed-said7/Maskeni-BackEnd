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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_service_1 = require("../common/Api/api.service");
let LikesService = class LikesService {
    constructor(likesModel, commentModel, apiService) {
        this.likesModel = likesModel;
        this.commentModel = commentModel;
        this.apiService = apiService;
    }
    async addLikeToPost(likeDto) {
        const { user, post } = likeDto;
        const existingLike = await this.likesModel.findOne({ user, post });
        if (existingLike) {
            throw new common_1.BadRequestException('User already liked this post');
        }
        const newLike = await this.likesModel.create(likeDto);
        return newLike;
    }
    async removeLikeFromPost(likeDto) {
        const { user, post } = likeDto;
        const like = await this.likesModel.findOneAndDelete({ user, post });
        if (!like) {
            throw new common_1.NotFoundException('User has not liked this post');
        }
        return like;
    }
    async addlikeToComment(comment, user) {
        let like = await this.likesModel.findOne({ user, comment });
        if (like) {
            return { status: 'like add before' };
        }
        like = await this.likesModel.create({ user, comment });
        await this.commentModel.findByIdAndUpdate(comment, {
            $addToSet: { likes: like._id },
            $inc: { likesCount: 1 },
        });
        return { status: 'like added' };
    }
    async removeikeFromComment(comment, user) {
        const like = await this.likesModel.findOneAndDelete({ user, comment });
        if (!like) {
            return { status: 'you do not have added like before' };
        }
        await this.commentModel.findByIdAndUpdate(comment, {
            $pull: { likes: like._id },
            $inc: { likesCount: -1 },
        });
        return { status: 'like removed' };
    }
    async getCommentLikes(commentId, obj) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        const { query, paginationObj } = await this.apiService.getAllDocs(this.likesModel.find(), obj, { _id: { $in: comment.likes } });
        const likes = await query.populate({
            path: 'user',
            model: 'User',
            select: 'name mobile icon',
        });
        return { likes, pagination: paginationObj };
    }
    async getPostLikes(ids, obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.likesModel.find(), obj, { _id: { $in: ids } });
        const likes = await query.populate({
            path: 'user',
            model: 'User',
            select: 'name mobile icon',
        });
        return { likes, pagination: paginationObj };
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Likes')),
    __param(1, (0, mongoose_1.InjectModel)('Comment')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        api_service_1.ApiService])
], LikesService);
//# sourceMappingURL=likes.service.js.map