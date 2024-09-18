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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.create.dto';
import { UpdatePostDto } from './dto/post.update.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/reaction/dto/comment.create.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}
  @Get('comments/:id')
  getPostComments(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getComments(postId, req.userId, query);
  }
  @Post('comments/:id')
  addPostComment(
    @Body() body: CreateCommentDto,
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.addComment(body, postId, req.userId);
  }
  @Delete('comments/post/:postId/comment/:commentId')
  deletePostComment(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
  ) {
    return this.postService.removeComment(postId, commentId, req.userId);
  }
  @Post('likes/:postId')
  addLike(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.addLike(postId, req.userId);
  }
  @Delete('likes/:postId')
  removeLike(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.removeLike(postId, req.userId);
  }
  @Get('likes/:postId')
  getLike(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getLikes(postId, req.userId, query);
  }
  @Post()
  createPost(@Req() req: any, @Body() body: CreatePostDto) {
    return this.postService.createPost(body, req.userId);
  }
  @Get(':id')
  getGroupPosts(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) groupId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getGroupPosts(groupId, req.userId, query);
  }
  @Delete(':id')
  deletePost(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.deletePost(postId, req.userId);
  }
  @Patch(':id')
  updatePost(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
    @Body() body: UpdatePostDto,
  ) {
    return this.postService.updatePost(body, postId, req.userId);
  }
}
