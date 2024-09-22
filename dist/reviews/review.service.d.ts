import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create.review.dto';
import { Review, ReviewDocument } from './review.schema';
import { UserDocument } from 'src/user/user.schema';
import { UpdateReviewDto } from './dto/update.review.dto';
export declare class ReviewService {
  private reviewModel;
  private userModel;
  constructor(
    reviewModel: Model<ReviewDocument>,
    userModel: Model<UserDocument>,
  );
  createReview(
    body: CreateReviewDto,
    userId: string,
  ): Promise<{
    review: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<unknown, {}, Review> &
        Review & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<unknown, {}, Review> &
      Review & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  updateReview(
    body: UpdateReviewDto,
    reviewId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  deleteReview(
    reviewId: string,
    user: string,
  ): Promise<{
    status: string;
  }>;
  private accessReview;
  private aggregation;
}
