import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create.review.dto';
import { Review, ReviewDocument } from './review.schema';
import { User, UserDocument } from 'src/user/user.schema';
import { UpdateReviewDto } from './dto/update.review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  async createReview(body: CreateReviewDto, userId: string) {
    const userExisting = await this.userModel.findById(body.review);
    if (!userExisting) {
      throw new HttpException('user not found', 400);
    }
    const reviewExisting = await this.reviewModel.findOne({
      review: body.review,
      user: userId,
    });
    if (reviewExisting) {
      throw new HttpException('you have already reviewed', 400);
    }
    body.user = userId;
    const review = await this.reviewModel.create(body);
    return { review };
  }
  async updateReview(body: UpdateReviewDto, reviewId: string, user: string) {
    const review = await this.accessReview(reviewId, user);
    if (body.rating) {
      review.rating = body.rating;
    }
    await review.save();
    await this.aggregation(user);
    return { status: 'updated' };
  }
  async deleteReview(reviewId: string, user: string) {
    const review = await this.accessReview(reviewId, user);
    await review.deleteOne();
    await this.aggregation(user);
    return { status: 'deleted' };
  }
  private async accessReview(reviewId: string, userId: string) {
    const review = await this.reviewModel.findOne({
      _id: reviewId,
      user: userId,
    });
    if (!review) {
      throw new HttpException('No review found', 400);
    }
    return review;
  }
  private async aggregation(userId: string) {
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
}
