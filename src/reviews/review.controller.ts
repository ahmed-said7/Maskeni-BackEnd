import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create.review.dto';
import { UpdateReviewDto } from './dto/update.review.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createReview(@Body() body: CreateReviewDto, @Req() req: any) {
    return this.reviewService.createReview(body, req.userId);
  }
  @Patch(':reviewId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateReview(
    @Body() body: UpdateReviewDto,
    @Param('reviewId') reviewId: string,
    @Req() req: any,
  ) {
    return this.reviewService.updateReview(body, reviewId, req.userId);
  }
  @Delete(':reviewId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteReview(@Param('reviewId') reviewId: string, @Req() req: any) {
    return this.reviewService.deleteReview(reviewId, req.userId);
  }
}
