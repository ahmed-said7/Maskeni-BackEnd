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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_service_1 = require("../common/Api/api.service");
const reaction_service_1 = require("../reaction/reaction.service");
const user_schema_1 = require("../user/user.schema");
const question_schema_1 = require("./question.schema");
let QuestionService = class QuestionService {
    constructor(questionModel, userModel, reactionService, apiService) {
        this.questionModel = questionModel;
        this.userModel = userModel;
        this.reactionService = reactionService;
        this.apiService = apiService;
        this.reactionService.setModel(questionModel);
    }
    async createQuestion(body, user) {
        body.user = user;
        const question = await this.questionModel.create(body);
        return { question };
    }
    async updateQuestion(questionId, body, user) {
        const questionExists = await this.questionModel.findById(questionId);
        if (!questionExists) {
            throw new common_1.HttpException('question not found', 400);
        }
        if (questionExists.user.toString() != user) {
            throw new common_1.HttpException('you are not allowed to update question', 400);
        }
        const question = await this.questionModel.findByIdAndUpdate(questionId, body, {
            new: true,
        });
        return { question };
    }
    async deleteQuestion(questionId, user) {
        const questionExists = await this.questionModel.findById(questionId);
        if (!questionExists) {
            throw new common_1.HttpException('question not found', 400);
        }
        if (questionExists.user.toString() != user) {
            throw new common_1.HttpException('you are not allowed to delete question', 400);
        }
        questionExists.isDeleted = true;
        await questionExists.save();
        return { status: 'deleted' };
    }
    async getQuestion(questionId) {
        const questionExists = await this.questionModel
            .findById(questionId)
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
        if (!questionExists) {
            throw new common_1.HttpException('question not found', 400);
        }
        return { question: questionExists };
    }
    async getAllQuestion(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.questionModel.find(), obj);
        const questions = await query
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
        return { questions, pagination: paginationObj };
    }
    async addLike(questionId, user) {
        return this.reactionService.createLike(questionId, user);
    }
    async removeLike(questionId, user) {
        return this.reactionService.deleteLike(questionId, user);
    }
    async getLikes(questionId, query) {
        return this.reactionService.getAllLikes(questionId, query);
    }
    async addComment(body, questionId, user) {
        const post = await this.questionModel.findOne({
            _id: questionId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        body.user = user;
        body.post = questionId;
        return this.reactionService.createComment(body);
    }
    async removeComment(commentId, user) {
        return this.reactionService.deleteComment(commentId, user);
    }
    async getComments(questionId, query) {
        return this.reactionService.getAllComments(query, questionId);
    }
    async addSaved(questionId, user) {
        const post = await this.questionModel.findOne({
            _id: questionId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        await this.reactionService.createSaved(questionId, user);
        await this.userModel.findByIdAndUpdate(user, {
            $addToSet: {
                savedQuestion: { question: questionId, createdAt: new Date() },
            },
        });
        return { status: 'saved added post' };
    }
    async deleteSaved(questionId, user) {
        const post = await this.questionModel.findOne({
            _id: questionId,
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        await this.reactionService.deleteSaved(questionId, user);
        await this.userModel.findByIdAndUpdate(user, {
            $pull: { savedQuestion: { question: questionId } },
        });
        return { status: 'saved deleted post' };
    }
    async getAllSaved(questionId, query) {
        return this.reactionService.getAllSaved(query, questionId);
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        reaction_service_1.ReactionService,
        api_service_1.ApiService])
], QuestionService);
//# sourceMappingURL=question.service.js.map