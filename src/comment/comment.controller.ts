import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':commentId')
  @ApiOperation({ summary: 'Get replies for a specific comment' }) // Description of what this endpoint does
  @ApiParam({
    name: 'commentId',
    required: true,
    description: 'ID of the comment to retrieve replies for',
  }) // Parameter details
  @ApiResponse({ status: 200, description: 'Successfully retrieved replies' }) // Successful response
  @ApiResponse({ status: 404, description: 'Comment not found' }) // Error response for not found
  getCommentReplies(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Query() query: FindQuery,
  ) {
    return this.commentService.getCommentsReplies(commentId, query);
  }
}
