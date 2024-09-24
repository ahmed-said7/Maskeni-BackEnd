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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('reviews') // Tag for grouping in Swagger
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'Review successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createReview(@Body() body: CreateReviewDto, @Req() req: any) {
    return this.reviewService.createReview(body, req.userId);
  }

  @Patch(':reviewId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update an existing review' })
  @ApiResponse({ status: 200, description: 'Review successfully updated.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
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
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({ status: 200, description: 'Review successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  deleteReview(@Param('reviewId') reviewId: string, @Req() req: any) {
    return this.reviewService.deleteReview(reviewId, req.userId);
  }
}
