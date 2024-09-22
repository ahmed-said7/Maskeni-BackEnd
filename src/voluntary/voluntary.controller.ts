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
  UseGuards,
} from '@nestjs/common';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { VoluntaryService } from './voluntary.service';
import { CreateVoluntaryDto } from './dto/voluntary.create.dto';
import { QueryVoluntaryDto } from './dto/voluntary.query.dto';
import { UpdateVoluntaryDto } from './dto/voluntary.update.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';

@Controller('voluntary')
export class VoluntaryController {
  constructor(private voluntaryService: VoluntaryService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createVoluntary(@Body() body: CreateVoluntaryDto, @Req() req: any) {
    return this.voluntaryService.createVoluntary(body, req.userId);
  }
  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getAllVoluntarys(@Query() query: QueryVoluntaryDto) {
    return this.voluntaryService.getAllVoluntary(query);
  }
  @Patch(':voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Body() body: UpdateVoluntaryDto,
    @Req() req: any,
  ) {
    return this.voluntaryService.updateVoluntary(voluntaryId, body, req.userId);
  }
  @Delete(':voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.deleteVoluntary(voluntaryId, req.userId);
  }
  @Post('comment/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createVoluntaryComment(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.voluntaryService.addComment(body, voluntaryId, req.userId);
  }
  @Get('comment/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getVoluntaryComment(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Query() query: FindQuery,
  ) {
    return this.voluntaryService.getComments(voluntaryId, query);
  }
  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteVoluntaryComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.removeComment(commentId, req.userId);
  }
  @Post('likes/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addVoluntaryLike(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.addLike(voluntaryId, req.userId);
  }
  @Delete('likes/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeVoluntaryLike(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.removeLike(voluntaryId, req.userId);
  }
  @Get('likes/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getVoluntaryLikes(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Query() query: FindQuery,
  ) {
    return this.voluntaryService.getLikes(voluntaryId, query);
  }
  @Post('saved/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addSavedVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.addSaved(voluntaryId, req.userId);
  }
  @Delete('saved/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeSavedVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.deleteSaved(voluntaryId, req.userId);
  }
  @Get('saved/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getSavedVoluntarys(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Query() query: QueryVoluntaryDto,
  ) {
    return this.voluntaryService.getAllSaved(voluntaryId, query);
  }
  @Get(':voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
  ) {
    return this.voluntaryService.getVoluntary(voluntaryId);
  }
}
