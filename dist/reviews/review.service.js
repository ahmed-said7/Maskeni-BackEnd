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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_schema_1 = require("./review.schema");
const user_schema_1 = require("../user/user.schema");
let ReviewService = class ReviewService {
    constructor(reviewModel, userModel) {
        this.reviewModel = reviewModel;
        this.userModel = userModel;
    }
    async createReview(body, userId) {
        const userExisting = await this.userModel.findById(body.review);
        if (!userExisting) {
            throw new common_1.HttpException('user not found', 400);
        }
        const reviewExisting = await this.reviewModel.findOne({
            review: body.review,
            user: userId,
        });
        if (reviewExisting) {
            throw new common_1.HttpException('you have already reviewed', 400);
        }
        body.user = userId;
        const review = await this.reviewModel.create(body);
        return { review };
    }
    async updateReview(body, reviewId, user) {
        const review = await this.accessReview(reviewId, user);
        if (body.rating) {
            review.rating = body.rating;
        }
        await review.save();
        await this.aggregation(user);
        return { status: 'updated' };
    }
    async deleteReview(reviewId, user) {
        const review = await this.accessReview(reviewId, user);
        await review.deleteOne();
        await this.aggregation(user);
        return { status: 'deleted' };
    }
    async accessReview(reviewId, userId) {
        const review = await this.reviewModel.findOne({
            _id: reviewId,
            user: userId,
        });
        if (!review) {
            throw new common_1.HttpException('No review found', 400);
        }
        return review;
    }
    async aggregation(userId) {
        const result = await this.reviewModel.aggregate([
            { $match: { review: userId } },
            {
                $group: {
                    _id: '$review',
                    average: { $avg: '$rating' },
                    quantity: { $sum: 1 },
                },
            },
        ]);
        if (result.length > 0) {
            await this.userModel.findByIdAndUpdate(userId, {
                averageRating: result[0].average,
                ratingQuantity: result[0].quantity,
            });
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_schema_1.Review.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ReviewService);
//# sourceMappingURL=review.service.js.map