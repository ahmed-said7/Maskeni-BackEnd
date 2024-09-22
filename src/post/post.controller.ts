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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.create.dto';
import { UpdatePostDto } from './dto/post.update.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('comment/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getPostComments(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getComments(postId, req.userId, query);
  }
  @Post('comment/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addPostComment(
    @Body() body: CreateCommentDto,
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.addComment(body, postId, req.userId);
  }
  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deletePostComment(
    @Req() req: any,
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
  ) {
    return this.postService.removeComment(commentId, req.userId);
  }
  @Post('likes/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addLike(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.addLike(postId, req.userId);
  }
  @Delete('likes/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeLike(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.removeLike(postId, req.userId);
  }
  @Get('likes/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getLike(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getLikes(postId, req.userId, query);
  }
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createPost(@Req() req: any, @Body() body: CreatePostDto) {
    return this.postService.createPost(body, req.userId);
  }
  @Get(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getGroupPosts(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) groupId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getGroupPosts(groupId, req.userId, query);
  }
  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deletePost(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.deletePost(postId, req.userId);
  }
  @Patch(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updatePost(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
    @Body() body: UpdatePostDto,
  ) {
    return this.postService.updatePost(body, postId, req.userId);
  }
}
