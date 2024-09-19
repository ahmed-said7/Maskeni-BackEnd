import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { CreateCommentDto } from 'src/reaction/dto/comment.create.dto';
import { FindQuery } from 'src/common/types';
import { ShareService } from './share.service';
import { CreateShareDto } from './dto/create.share.dto';
import { QueryShareDto } from './dto/query.share.dto';
import { UpdateShareDto } from './dto/update.share.dto';

@Controller('share')
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Post()
  createShare(@Body() body: CreateShareDto, @Req() req: any) {
    return this.shareService.createShare(body, req.userId);
  }
  @Get()
  getAllShare(@Query() query: QueryShareDto) {
    return this.shareService.getAllShare(query);
  }
  @Patch(':shareId')
  updateShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Body() body: UpdateShareDto,
    @Req() req: any,
  ) {
    return this.shareService.updateShare(shareId, body, req.userId);
  }
  @Delete(':shareId')
  deleteShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.deleteShare(shareId, req.userId);
  }
  @Post(':shareId/comment')
  createShareComment(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.shareService.addComment(body, shareId, req.userId);
  }
  @Post(':shareId/comment')
  getShareComment(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Query() query: FindQuery,
  ) {
    return this.shareService.getComments(shareId, query);
  }
  @Delete(':shareId/comment/:commentId')
  deleteShareComment(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.shareService.removeComment(shareId, commentId, req.userId);
  }
  @Post('likes/:shareId')
  addShareLike(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.addLike(shareId, req.userId);
  }
  @Delete('likes/:shareId')
  removeShareLike(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.removeLike(shareId, req.userId);
  }
  @Get('likes/:shareId')
  getShareLikes(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Query() query: FindQuery,
  ) {
    return this.shareService.getLikes(shareId, query);
  }
  @Post('saved/:shareId')
  addSavedShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.addSaved(shareId, req.userId);
  }
  @Delete('saved/:shareId')
  removeSavedShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.deleteSaved(shareId, req.userId);
  }
  @Get('saved/:shareId')
  getSavedShares(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Query() query: QueryShareDto,
  ) {
    return this.shareService.getAllSaved(shareId, query);
  }
  @Get(':shareId')
  getShare(@Param('shareId', ValidateObjectIdPipe) shareId: string) {
    return this.shareService.getShare(shareId);
  }
}
