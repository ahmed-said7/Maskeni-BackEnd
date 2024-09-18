import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create.review.dto';
import { UpdateReviewDto } from './dto/update.review.dto';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @Post()
  createReview(@Body() body: CreateReviewDto, @Req() req: any) {
    return this.reviewService.createReview(body, req.userId);
  }
  @Patch(':reviewId')
  updateReview(
    @Body() body: UpdateReviewDto,
    @Param('reviewId') reviewId: string,
    @Req() req: any,
  ) {
    return this.reviewService.updateReview(body, reviewId, req.userId);
  }
  @Delete(':reviewId')
  deleteReview(@Param('reviewId') reviewId: string, @Req() req: any) {
    return this.reviewService.deleteReview(reviewId, req.userId);
  }
}
