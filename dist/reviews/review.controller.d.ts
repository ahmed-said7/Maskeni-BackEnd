import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create.review.dto';
import { UpdateReviewDto } from './dto/update.review.dto';
export declare class ReviewController {
  private reviewService;
  constructor(reviewService: ReviewService);
  createReview(
    body: CreateReviewDto,
    req: any,
  ): Promise<{
    review: import('mongoose').Document<
      unknown,
      {},
      import('mongoose').Document<
        unknown,
        {},
        import('./review.schema').Review
      > &
        import('./review.schema').Review & {
          _id: import('mongoose').Types.ObjectId;
        }
    > &
      import('mongoose').Document<
        unknown,
        {},
        import('./review.schema').Review
      > &
      import('./review.schema').Review & {
        _id: import('mongoose').Types.ObjectId;
      } & Required<{
        _id: import('mongoose').Types.ObjectId;
      }>;
  }>;
  updateReview(
    body: UpdateReviewDto,
    reviewId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
  deleteReview(
    reviewId: string,
    req: any,
  ): Promise<{
    status: string;
  }>;
}
