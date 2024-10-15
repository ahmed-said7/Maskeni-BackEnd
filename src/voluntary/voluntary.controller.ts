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
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
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

@ApiTags('Voluntary')
@Controller('voluntary')
export class VoluntaryController {
  constructor(private voluntaryService: VoluntaryService) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get my deleted voluntary activities' })
  async getMyDeletedVoluntary(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId;
    return this.voluntaryService.getMyDeletedVoluntary(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get my archived voluntary activities' })
  async getMyArchivedVoluntary(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId;
    return this.voluntaryService.getMyArchivedVoluntary(query, userId);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new voluntary activity' })
  createVoluntary(@Body() body: CreateVoluntaryDto, @Req() req: any) {
    return this.voluntaryService.createVoluntary(body, req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get all voluntary activities with filters' })
  getAllVoluntarys(@Query() query: QueryVoluntaryDto, @Req() req: any) {
    return this.voluntaryService.getAllVoluntary(query, req.userId);
  }
  @Get('profile')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get all voluntary activities with filters' })
  getAllVoluntarysProfile(@Query() query: QueryVoluntaryDto, @Req() req: any) {
    query.user = req.userId;
    return this.voluntaryService.getAllVoluntary(query, req.userId);
  }

  @Patch(':voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update a specific voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to update',
  })
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
  @ApiOperation({ summary: 'Delete a voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to delete',
  })
  deleteVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.deleteVoluntary(voluntaryId, req.userId);
  }

  @Post('comment/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a comment to a voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to comment on',
  })
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
  @ApiOperation({ summary: 'Get comments for a voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to retrieve comments for',
  })
  getVoluntaryComment(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Query() query: FindQuery,
  ) {
    return this.voluntaryService.getComments(voluntaryId, query);
  }

  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a comment from a voluntary activity' })
  @ApiParam({
    name: 'commentId',
    description: 'The ID of the comment to delete',
  })
  deleteVoluntaryComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.removeComment(commentId, req.userId);
  }

  @Post('likes/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a like to a voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to like',
  })
  addVoluntaryLike(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.addLike(voluntaryId, req.userId);
  }

  @Delete('likes/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove a like from a voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to unlike',
  })
  removeVoluntaryLike(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.removeLike(voluntaryId, req.userId);
  }

  @Get('likes/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get likes for a voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to retrieve likes for',
  })
  getVoluntaryLikes(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Query() query: FindQuery,
  ) {
    return this.voluntaryService.getLikes(voluntaryId, query);
  }

  @Post('saved/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Save a voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to save',
  })
  addSavedVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.addSaved(voluntaryId, req.userId);
  }

  @Delete('saved/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove a saved voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to remove from saved',
  })
  removeSavedVoluntary(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.deleteSaved(voluntaryId, req.userId);
  }

  @Get('saved/:voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get all saved voluntary activities' })
  @ApiParam({
    name: 'voluntaryId',
    description:
      'The ID of the voluntary activity to retrieve saved activities for',
  })
  getSavedVoluntarys(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Query() query: QueryVoluntaryDto,
  ) {
    return this.voluntaryService.getAllSaved(voluntaryId, query);
  }

  @Get(':voluntaryId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get details of a specific voluntary activity' })
  @ApiParam({
    name: 'voluntaryId',
    description: 'The ID of the voluntary activity to retrieve',
  })
  getVoluntaryById(
    @Param('voluntaryId', ValidateObjectIdPipe) voluntaryId: string,
    @Req() req: any,
  ) {
    return this.voluntaryService.getVoluntary(voluntaryId, req.userId);
  }
}
