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
exports.VoluntaryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_service_1 = require("../common/Api/api.service");
const reaction_service_1 = require("../reaction/reaction.service");
const user_schema_1 = require("../user/user.schema");
const voluntary_schema_1 = require("./voluntary.schema");
let VoluntaryService = class VoluntaryService {
    constructor(voluntaryModel, userModel, reactionService, apiService) {
        this.voluntaryModel = voluntaryModel;
        this.userModel = userModel;
        this.reactionService = reactionService;
        this.apiService = apiService;
        this.reactionService.setModel(voluntaryModel);
    }
    async createVoluntary(body, user) {
        body.user = user;
        if (!body.date) {
            const date = new Date(body.startedAt);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            body.date = new Date(year, month, day).toISOString();
        }
        const voluntary = await this.voluntaryModel.create(body);
        return { voluntary };
    }
    async updateVoluntary(voluntaryId, body, user) {
        const voluntaryExists = await this.voluntaryModel.findById(voluntaryId);
        if (!voluntaryExists) {
            throw new common_1.HttpException('voluntary not found', 400);
        }
        if (voluntaryExists.user.toString() != user) {
            throw new common_1.HttpException('you are not allowed to update voluntary', 400);
        }
        const voluntary = await this.voluntaryModel.findByIdAndUpdate(voluntaryId, body, {
            new: true,
        });
        return { voluntary };
    }
    async deleteVoluntary(voluntaryId, user) {
        const voluntaryExists = await this.voluntaryModel.findById(voluntaryId);
        if (!voluntaryExists) {
            throw new common_1.HttpException('voluntary not found', 400);
        }
        if (voluntaryExists.user.toString() != user) {
            throw new common_1.HttpException('you are not allowed to delete voluntary', 400);
        }
        voluntaryExists.isDeleted = true;
        await voluntaryExists.save();
        return { status: 'deleted' };
    }
    async getVoluntary(voluntaryId) {
        const voluntaryExists = await this.voluntaryModel
            .findById(voluntaryId)
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
        });
        if (!voluntaryExists) {
            throw new common_1.HttpException('voluntary not found', 400);
        }
        return { voluntary: voluntaryExists };
    }
    async getAllVoluntary(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.voluntaryModel.find(), obj);
        const voluntary = await query
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
        });
        return { voluntary, pagination: paginationObj };
    }
    async addLike(voluntaryId, user) {
        const post = await this.voluntaryModel.findOne({
            _id: voluntaryId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return this.reactionService.createLike(voluntaryId, user);
    }
    async removeLike(voluntaryId, user) {
        const post = await this.voluntaryModel.findOne({
            _id: voluntaryId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return this.reactionService.deleteLike(voluntaryId, user);
    }
    async getLikes(voluntaryId, query) {
        return this.reactionService.getAllLikes(voluntaryId, query);
    }
    async addComment(body, voluntaryId, user) {
        const post = await this.voluntaryModel.findOne({
            _id: voluntaryId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        body.user = user;
        body.post = voluntaryId;
        return this.reactionService.createComment(body);
    }
    async removeComment(commentId, user) {
        return this.reactionService.deleteComment(commentId, user);
    }
    async getComments(voluntaryId, query) {
        return this.reactionService.getAllComments(query, voluntaryId);
    }
    async addSaved(voluntaryId, user) {
        const post = await this.voluntaryModel.findOne({
            _id: voluntaryId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        await this.reactionService.createSaved(voluntaryId, user);
        await this.userModel.findByIdAndUpdate(user, {
            $addToSet: { savedVoluntary: { voluntary: voluntaryId } },
        });
        return { status: 'saved added post' };
    }
    async deleteSaved(voluntaryId, user) {
        const post = await this.voluntaryModel.findOne({
            _id: voluntaryId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        await this.reactionService.deleteSaved(voluntaryId, user);
        await this.userModel.findByIdAndUpdate(user, {
            $pull: { savedVoluntary: { voluntary: voluntaryId } },
        });
        return { status: 'saved deleted post' };
    }
    async getAllSaved(voluntaryId, query) {
        return this.reactionService.getAllSaved(query, voluntaryId);
    }
};
exports.VoluntaryService = VoluntaryService;
exports.VoluntaryService = VoluntaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(voluntary_schema_1.Voluntary.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        reaction_service_1.ReactionService,
        api_service_1.ApiService])
], VoluntaryService);
//# sourceMappingURL=voluntary.service.js.map