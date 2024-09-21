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

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}
  @Post(':commentId')
  @UseGuards(AuthenticationGuard, AuthenticationGuard)
  @Roles(All_Role.User)
  addLike(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.likesService.addlikeToComment(commentId, req.userId);
  }
  @Delete(':commentId')
  @UseGuards(AuthenticationGuard, AuthenticationGuard)
  @Roles(All_Role.User)
  deleteLike(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.likesService.removeikeFromComment(commentId, req.userId);
  }
  @Get(':commentId')
  getCommentLikes(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Query() query: FindQuery,
  ) {
    return this.likesService.getCommentLikes(commentId, query);
  }
}
