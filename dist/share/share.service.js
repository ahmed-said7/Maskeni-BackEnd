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
exports.ShareService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_service_1 = require("../common/Api/api.service");
const reaction_service_1 = require("../reaction/reaction.service");
const user_schema_1 = require("../user/user.schema");
const share_schema_1 = require("./share.schema");
let ShareService = class ShareService {
    constructor(shareModel, userModel, reactionService, apiService) {
        this.shareModel = shareModel;
        this.userModel = userModel;
        this.reactionService = reactionService;
        this.apiService = apiService;
        this.reactionService.setModel(shareModel);
    }
    async createShare(body, user) {
        body.user = user;
        const event = await this.shareModel.create(body);
        return { event };
    }
    async updateShare(shareId, body, user) {
        const shareExists = await this.shareModel.findById(shareId);
        if (!shareExists) {
            throw new common_1.HttpException('share not found', 400);
        }
        if (shareExists.user.toString() != user) {
            throw new common_1.HttpException('you are not allowed to update share', 400);
        }
        const share = await this.shareModel.findByIdAndUpdate(shareId, body, {
            new: true,
        });
        return { share };
    }
    async deleteShare(shareId, user) {
        const shareExists = await this.shareModel.findById(shareId);
        if (!shareExists) {
            throw new common_1.HttpException('share not found', 400);
        }
        if (shareExists.user.toString() != user) {
            throw new common_1.HttpException('you are not allowed to delete share', 400);
        }
        shareExists.isDeleted = true;
        await shareExists.save();
        return { status: 'deleted' };
    }
    async getShare(shareId) {
        const shareExists = await this.shareModel
            .findById(shareId)
            .populate({
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
        })
            .populate({
            path: 'comments',
            select: '-likes -comments -replies',
            populate: { path: 'user', select: 'name mobile icon', model: 'User' },
            options: { limit: 1 },
        })
            .populate({
            path: 'likes',
            populate: { path: 'user', select: 'name mobile icon', model: 'User' },
            options: { limit: 1 },
        });
        if (!shareExists) {
            throw new common_1.HttpException('share not found', 400);
        }
        return { share: shareExists };
    }
    async getAllShare(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.shareModel.find(), obj);
        const shares = await query
            .populate({
            path: 'user',
            model: 'User',
            select: 'mobile name icon',
        })
            .populate({
            path: 'comments',
            select: '-likes -comments -replies',
            populate: { path: 'user', select: 'name mobile icon', model: 'User' },
            options: { limit: 1 },
        })
            .populate({
            path: 'likes',
            populate: { path: 'user', select: 'name mobile icon', model: 'User' },
            options: { limit: 1 },
        });
        return { shares, pagination: paginationObj };
    }
    async addLike(shareId, user) {
        return this.reactionService.createLike(shareId, user);
    }
    async removeLike(shareId, user) {
        return this.reactionService.deleteLike(shareId, user);
    }
    async getLikes(shareId, query) {
        return this.reactionService.getAllLikes(shareId, query);
    }
    async addComment(body, shareId, user) {
        const post = await this.shareModel.findOne({
            _id: shareId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        body.user = user;
        body.post = shareId;
        return this.reactionService.createComment(body);
    }
    async removeComment(commentId, user) {
        return this.reactionService.deleteComment(commentId, user);
    }
    async getComments(shareId, query) {
        return this.reactionService.getAllComments(query, shareId);
    }
    async addSaved(shareId, user) {
        const post = await this.shareModel.findOne({
            _id: shareId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        await this.reactionService.createSaved(shareId, user);
        await this.userModel.findByIdAndUpdate(user, {
            $addToSet: { savedShare: { share: shareId, createdAt: new Date() } },
        });
        return { status: 'saved added post' };
    }
    async deleteSaved(shareId, user) {
        const post = await this.shareModel.findOne({
            _id: shareId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        await this.reactionService.deleteSaved(shareId, user);
        await this.userModel.findByIdAndUpdate(user, {
            $pull: { savedShare: { share: shareId } },
        });
        return { status: 'saved deleted post' };
    }
    async getAllSaved(shareId, query) {
        return this.reactionService.getAllSaved(query, shareId);
    }
    async getMyArcivedShare(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.shareModel.find(), obj, { isArchived: true });
        const events = await query.setOptions({ skipFilter: true });
        return { events, pagination: paginationObj };
    }
    async getMyDeletdShare(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.shareModel.find(), obj, { isDeleted: true });
        const events = await query.setOptions({ skipFilter: true });
        return { events, pagination: paginationObj };
    }
};
exports.ShareService = ShareService;
exports.ShareService = ShareService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(share_schema_1.Share.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        reaction_service_1.ReactionService,
        api_service_1.ApiService])
], ShareService);
//# sourceMappingURL=share.service.js.map