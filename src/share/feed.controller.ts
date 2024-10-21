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
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { ApiTags } from '@nestjs/swagger';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create.feed.dto';
import { QueryFeedDto } from './dto/query.feed.dto';
import { UpdateFeedDto } from './dto/update.feed.dto';

@ApiTags('Feed') // Tag for grouping related operations
// @ApiBearerAuth() // Adds Bearer Auth requirement
@Controller('feed')
export class FeedController {
  constructor(private postService: FeedService) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  async getMyDeleted(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // Assuming user ID is stored in the request object
    return this.postService.getMyDeletd(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  async getMyArchived(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // Assuming user ID is stored in the request object
    return this.postService.getMyArcived(query, userId);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  create(@Body() body: CreateFeedDto, @Req() req: any) {
    return this.postService.create(body, req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getAll(@Query() query: QueryFeedDto, @Req() req: any) {
    return this.postService.getAll(query, req.userId);
  }
  @Get('profile')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getAllProfilePosts(@Query() query: QueryFeedDto, @Req() req: any) {
    query.user = req.userId;
    return this.postService.getAll(query, req.userId);
  }

  @Patch(':postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  update(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Body() body: UpdateFeedDto,
    @Req() req: any,
  ) {
    return this.postService.updateOne(postId, body, req.userId);
  }

  @Delete(':postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  delete(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Req() req: any,
  ) {
    return this.postService.deleteOne(postId, req.userId);
  }

  @Post('comment/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createComment(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.postService.addComment(body, postId, req.userId);
  }

  @Get('comment/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getComment(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getComments(postId, query);
  }

  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.postService.removeComment(commentId, req.userId);
  }

  @Post('likes/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addLike(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Req() req: any,
  ) {
    return this.postService.addLike(postId, req.userId);
  }

  @Delete('likes/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeLike(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Req() req: any,
  ) {
    return this.postService.removeLike(postId, req.userId);
  }

  @Get('likes/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getLikes(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getLikes(postId, query);
  }

  @Post('saved/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addSaved(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Req() req: any,
  ) {
    return this.postService.addSaved(postId, req.userId);
  }

  @Delete('saved/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeSaved(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Req() req: any,
  ) {
    return this.postService.deleteSaved(postId, req.userId);
  }

  @Get('saved/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getSaved(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Query() query: QueryFeedDto,
  ) {
    return this.postService.getAllSaved(postId, query);
  }

  @Get(':postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getOne(
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Req() req: any,
  ) {
    return this.postService.getOne(postId, req.userId);
  }
}
