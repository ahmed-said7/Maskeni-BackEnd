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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionService = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("../comment/comment.service");
const likes_service_1 = require("../likes/likes.service");
let ReactionService = class ReactionService {
    constructor(commentService, likesService) {
        this.commentService = commentService;
        this.likesService = likesService;
    }
    setModel(PostModel) {
        if (this.PostModel) {
            return this;
        }
        this.PostModel = PostModel;
        return this;
    }
    async createComment(body) {
        const comment = await this.commentService.create(body);
        if (!comment.parentComment) {
            return comment;
        }
        await this.PostModel.findByIdAndUpdate(body.post, {
            $addToSet: { comments: comment._id },
            $inc: { commentCount: 1 },
        });
        return comment;
    }
    async getAllComments(query, id) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const post = await this.PostModel.findById(id).select({
            comments: { $slice: [skip, limit] },
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return this.commentService.getPostComments(post.comments, query);
    }
    async deleteComment(commentId, userId) {
        const result = await this.commentService.getOne(commentId);
        if (result.user.toString() == userId) {
            await this.commentService.remove(commentId);
            await this.PostModel.findByIdAndUpdate(result.post, {
                $pull: { comments: result._id },
                $inc: { commentCount: -1 },
            });
            return { status: 'deleted' };
        }
        const post = await this.PostModel.findOne({
            user: userId,
            _id: result.post,
        });
        if (!post) {
            throw new common_1.HttpException('post not found or you are not the owner', 400);
        }
        await this.commentService.remove(commentId);
        await this.PostModel.findByIdAndUpdate(result.post, {
            $pull: { comments: result._id },
            $inc: { commentCount: -1 },
        });
        return { status: 'deleted' };
    }
    async createLike(postId, userId) {
        const like = await this.likesService.addLikeToPost({
            post: postId,
            user: userId,
        });
        await this.PostModel.findByIdAndUpdate(postId, {
            $addToSet: { likes: like._id },
            $inc: { likeCount: 1 },
        });
        return { status: 'like created' };
    }
    async getAllLikes(postId, query) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const post = await this.PostModel.findById(postId).select({
            likes: { $slice: [skip, limit] },
        });
        if (!post) {
            throw new common_1.HttpException('document not found', 400);
        }
        return this.likesService.getPostLikes(post.likes, query);
    }
    async deleteLike(postId, userId) {
        const like = await this.likesService.removeLikeFromPost({
            post: postId,
            user: userId,
        });
        await this.PostModel.findByIdAndUpdate(postId, {
            $pull: { likes: like._id },
            $inc: { likeCount: -1 },
        });
        return { status: 'like deleted' };
    }
    async createSaved(postId, userId) {
        const post = await this.PostModel.findOne({ 'saved.user': userId });
        if (post) {
            throw new common_1.HttpException('already saved', 400);
        }
        await this.PostModel.findByIdAndUpdate(postId, {
            $addToSet: {
                saved: { user: userId, createdAt: new Date() },
                $inc: { savedCount: 1 },
            },
        });
    }
    async getAllSaved(query, id) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const post = await this.PostModel.findById(id)
            .select({
            saved: {
                $slice: [skip, limit],
            },
        })
            .populate({
            select: 'name mobile icon',
            model: 'User',
            path: 'saved.user',
        });
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return { totalPages: post.savedCount, page, limit, saved: post.saved };
    }
    async deleteSaved(postId, userId) {
        const post = await this.PostModel.findOne({ 'saved.user': userId });
        if (!post) {
            throw new common_1.HttpException('not saved', 400);
        }
        await this.PostModel.findByIdAndUpdate(postId, {
            $pull: { saved: { user: userId } },
            $inc: { savedCount: -1 },
        }, { new: true });
    }
    async createRequestedService(postId, userId) {
        await this.PostModel.findByIdAndUpdate(postId, {
            $addToSet: {
                requested: { user: userId, createdAt: new Date() },
            },
            $inc: { requestedCount: 1 },
        });
    }
    async getAllRequestedServices(query, id) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const post = await this.PostModel.findById(id)
            .select({
            saved: {
                $slice: [skip, limit],
            },
        })
            .populate('requested.user');
        if (!post) {
            throw new common_1.HttpException('post not found', 400);
        }
        return {
            totalPages: post.requestedCount,
            page,
            limit,
            requested: post.requested,
        };
    }
    async deleteRequestedService(postId, userId) {
        await this.PostModel.findByIdAndUpdate(postId, {
            $pull: { requested: { user: userId } },
            $inc: { requestedCount: -1 },
        }, { new: true });
    }
};
exports.ReactionService = ReactionService;
exports.ReactionService = ReactionService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        likes_service_1.LikesService])
], ReactionService);
//# sourceMappingURL=reaction.service.js.map