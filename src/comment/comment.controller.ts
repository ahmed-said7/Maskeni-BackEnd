import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Get(':commentId')
  getCommentReplies(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Query() query: FindQuery,
  ) {
    return this.commentService.getCommentsReplies(commentId, query);
  }
}
