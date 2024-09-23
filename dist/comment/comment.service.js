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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const api_service_1 = require("../common/Api/api.service");
let CommentService = class CommentService {
    constructor(commentModel, apiService) {
        this.commentModel = commentModel;
        this.apiService = apiService;
    }
    async create(body) {
        const newComment = await this.commentModel.create(body);
        if (newComment.parentComment) {
            await this.commentModel.findByIdAndUpdate(body.parentComment, {
                $addToSet: { replies: newComment._id },
                $inc: { repliesCount: 1 },
            }, { new: true });
        }
        return newComment;
    }
    async findAll(obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.commentModel.find(), obj);
        const comments = await query;
        return { comments, pagination: paginationObj };
    }
    async update(id, userId, updateCommentDto) {
        const result = await this.commentModel.findOneAndUpdate({
            _id: id,
            user: userId,
        }, updateCommentDto);
        if (!result) {
            throw new common_1.NotFoundException(`Comment with ID "${id}" not found`);
        }
        return result;
    }
    async getOne(id) {
        const result = await this.commentModel.findById(id);
        if (!result) {
            throw new common_1.NotFoundException(`Comment with ID "${id}" not found`);
        }
        return result;
    }
    async remove(id) {
        const comment = await this.commentModel.findOneAndDelete({
            _id: id,
        });
        if (comment.parentComment) {
            await this.commentModel.findByIdAndUpdate(comment.parentComment, {
                $pull: { replies: comment._id },
                $inc: { repliesCount: -1 },
            });
        }
        return comment;
    }
    async getComments(ids, obj) {
        const { query, paginationObj } = await this.apiService.getAllDocs(this.commentModel.find(), obj, { _id: { $in: ids } });
        const comments = await query.populate({
            path: 'replies',
            options: { limit: 1 },
        });
        return { comments, pagination: paginationObj };
    }
    async getCommentsReplies(commentId, obj) {
        const comment = await this.commentModel.findById(commentId);
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID "${commentId}" not found`);
        }
        return this.getComments(comment.replies, obj);
    }
    async getPostComments(ids, obj) {
        return this.getComments(ids, obj);
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Comment')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_service_1.ApiService])
], CommentService);
//# sourceMappingURL=comment.service.js.map