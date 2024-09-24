import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { LikesService } from './likes.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { FindQuery } from 'src/common/types';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('likes') // Grouping related endpoints
@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post(':commentId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a like to a comment' })
  @ApiResponse({ status: 201, description: 'Like added successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  addLike(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.likesService.addlikeToComment(commentId, req.userId);
  }

  @Delete(':commentId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove a like from a comment' })
  @ApiResponse({ status: 200, description: 'Like removed successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  deleteLike(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.likesService.removeikeFromComment(commentId, req.userId);
  }

  @Get(':commentId')
  @ApiOperation({ summary: 'Get likes for a specific comment' })
  @ApiResponse({ status: 200, description: 'Likes retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  getCommentLikes(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Query() query: FindQuery,
  ) {
    return this.likesService.getCommentLikes(commentId, query);
  }
}
