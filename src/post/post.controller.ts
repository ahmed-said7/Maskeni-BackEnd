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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('posts') // Grouping related endpoints
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get deleted posts for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of deleted posts' })
  async getMyDeletedPosts(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.postService.getMyDeletedPosts(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get archived posts for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of archived posts' })
  async getMyArchivedPosts(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.postService.getMyArchivedPosts(query, userId);
  }

  @Get('comment/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get comments for a specific post' })
  @ApiResponse({ status: 200, description: 'List of comments for the post' })
  async getPostComments(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getComments(postId, req.userId, query);
  }

  @Post('comment/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a comment to a specific post' })
  @ApiResponse({ status: 201, description: 'Comment successfully added' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addPostComment(
    @Body() body: CreateCommentDto,
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.addComment(body, postId, req.userId);
  }

  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a specific comment' })
  @ApiResponse({ status: 204, description: 'Comment successfully deleted' })
  async deletePostComment(
    @Req() req: any,
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
  ) {
    return this.postService.removeComment(commentId, req.userId);
  }

  @Post('likes/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a like to a specific post' })
  @ApiResponse({ status: 201, description: 'Like successfully added' })
  async addLike(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.addLike(postId, req.userId);
  }

  @Delete('likes/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove a like from a specific post' })
  @ApiResponse({ status: 204, description: 'Like successfully removed' })
  async removeLike(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.removeLike(postId, req.userId);
  }

  @Get('likes/:postId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get likes for a specific post' })
  @ApiResponse({ status: 200, description: 'List of likes for the post' })
  async getLike(
    @Req() req: any,
    @Param('postId', ValidateObjectIdPipe) postId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getLikes(postId, req.userId, query);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post successfully created' })
  async createPost(@Req() req: any, @Body() body: CreatePostDto) {
    return this.postService.createPost(body, req.userId);
  }

  @Get('my-groups')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: "Get posts for the user's groups" })
  @ApiResponse({ status: 200, description: 'List of posts in user groups' })
  async getUserGroupsPosts(@Req() req: any, @Query() query: FindQuery) {
    return this.postService.getUserGroupsPosts(req.userId, query);
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get posts for a specific group' })
  @ApiResponse({
    status: 200,
    description: 'List of posts in the specified group',
  })
  async getGroupPosts(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) groupId: string,
    @Query() query: FindQuery,
  ) {
    return this.postService.getGroupPosts(groupId, req.userId, query);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a specific post' })
  @ApiResponse({ status: 204, description: 'Post successfully deleted' })
  async deletePost(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
  ) {
    return this.postService.deletePost(postId, req.userId);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update a specific post' })
  @ApiResponse({ status: 200, description: 'Post successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updatePost(
    @Req() req: any,
    @Param('id', ValidateObjectIdPipe) postId: string,
    @Body() body: UpdatePostDto,
  ) {
    return this.postService.updatePost(body, postId, req.userId);
  }
}
