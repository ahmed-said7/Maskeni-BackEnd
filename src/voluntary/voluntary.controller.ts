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
import { FindQuery } from 'src/common/types';
import { VoluntaryService } from './voluntary.service';
import { CreateVoluntaryDto } from './dto/voluntary.create.dto';
import { QueryVoluntaryDto } from './dto/voluntary.query.dto';
import { UpdateVoluntaryDto } from './dto/voluntary.update.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';

@Controller('voluntary')
export class VoluntaryController {
  constructor(private voluntaryService: VoluntaryService) {}

  @Post()
  createVoluntary(@Body() body: CreateVoluntaryDto, @Req() req: any) {
    return this.voluntaryService.createVoluntary(body, req.userId);
  }
  @Get()
  getAllVoluntarys(@Query() query: QueryVoluntaryDto) {
    return this.voluntaryService.getAllVoluntary(query);
  }
  @Patch(':voluntaryId')
  updateVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Body() body: UpdateVoluntaryDto,
    @Req() req: any,
  ) {
    return this.voluntaryService.updateVoluntary(voluntaryId, body, req.userId);
  }
  @Delete(':voluntaryId')
  deleteVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.deleteVoluntary(voluntaryId, req.userId);
  }
  @Post('comment/:voluntaryId')
  createVoluntaryComment(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.voluntaryService.addComment(body, voluntaryId, req.userId);
  }
  @Get('comment/:voluntaryId')
  getVoluntaryComment(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Query() query: FindQuery,
  ) {
    return this.voluntaryService.getComments(voluntaryId, query);
  }
  @Delete('comment/:voluntaryId')
  deleteVoluntaryComment(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.removeComment(
      voluntaryId,
      commentId,
      req.userId,
    );
  }
  @Post('likes/:voluntaryId')
  addVoluntaryLike(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.addLike(voluntaryId, req.userId);
  }
  @Delete('likes/:voluntaryId')
  removeVoluntaryLike(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.removeLike(voluntaryId, req.userId);
  }
  @Get('likes/:voluntaryId')
  getVoluntaryLikes(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Query() query: FindQuery,
  ) {
    return this.voluntaryService.getLikes(voluntaryId, query);
  }
  @Post('saved/:voluntaryId')
  addSavedVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.addSaved(voluntaryId, req.userId);
  }
  @Delete('saved/:voluntaryId')
  removeSavedVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.deleteSaved(voluntaryId, req.userId);
  }
  @Get('saved/:voluntaryId')
  getSavedVoluntarys(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Query() query: QueryVoluntaryDto,
  ) {
    return this.voluntaryService.getAllSaved(voluntaryId, query);
  }
  @Get(':voluntaryId')
  getVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
  ) {
    return this.voluntaryService.getVoluntary(voluntaryId);
  }
}
