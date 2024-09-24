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
import { ShareService } from './share.service';
import { CreateShareDto } from './dto/create.share.dto';
import { QueryShareDto } from './dto/query.share.dto';
import { UpdateShareDto } from './dto/update.share.dto';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Share') // Tag for grouping related operations
@Controller('share')
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get deleted shares' })
  @ApiResponse({
    status: 200,
    description: 'Returns deleted shares for the user',
  })
  async getMyDeletedShare(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // Assuming user ID is stored in the request object
    return this.shareService.getMyDeletdShare(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get archived shares' })
  @ApiResponse({
    status: 200,
    description: 'Returns archived shares for the user',
  })
  async getMyArchivedShare(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // Assuming user ID is stored in the request object
    return this.shareService.getMyArcivedShare(query, userId);
  }

  @Post()
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new share' })
  @ApiResponse({ status: 201, description: 'Successfully created a share' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  createShare(@Body() body: CreateShareDto, @Req() req: any) {
    return this.shareService.createShare(body, req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get all shares' })
  @ApiResponse({ status: 200, description: 'Returns all shares' })
  getAllShare(@Query() query: QueryShareDto) {
    return this.shareService.getAllShare(query);
  }

  @Patch(':shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update a share by ID' })
  @ApiResponse({ status: 200, description: 'Successfully updated the share' })
  @ApiResponse({ status: 404, description: 'Share not found' })
  updateShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Body() body: UpdateShareDto,
    @Req() req: any,
  ) {
    return this.shareService.updateShare(shareId, body, req.userId);
  }

  @Delete(':shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a share by ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the share' })
  @ApiResponse({ status: 404, description: 'Share not found' })
  deleteShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.deleteShare(shareId, req.userId);
  }

  @Post('comment/:shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a comment to a share' })
  @ApiResponse({ status: 201, description: 'Successfully added a comment' })
  @ApiResponse({ status: 404, description: 'Share not found' })
  createShareComment(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.shareService.addComment(body, shareId, req.userId);
  }

  @Get('comment/:shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get comments for a share' })
  @ApiResponse({
    status: 200,
    description: 'Returns comments for the specified share',
  })
  getShareComment(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Query() query: FindQuery,
  ) {
    return this.shareService.getComments(shareId, query);
  }

  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the comment' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  deleteShareComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.shareService.removeComment(commentId, req.userId);
  }

  @Post('likes/:shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Like a share' })
  @ApiResponse({ status: 200, description: 'Successfully liked the share' })
  @ApiResponse({ status: 404, description: 'Share not found' })
  addShareLike(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.addLike(shareId, req.userId);
  }

  @Delete('likes/:shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove like from a share' })
  @ApiResponse({ status: 200, description: 'Successfully removed the like' })
  @ApiResponse({ status: 404, description: 'Share not found' })
  removeShareLike(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.removeLike(shareId, req.userId);
  }

  @Get('likes/:shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get likes for a share' })
  @ApiResponse({
    status: 200,
    description: 'Returns likes for the specified share',
  })
  getShareLikes(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Query() query: FindQuery,
  ) {
    return this.shareService.getLikes(shareId, query);
  }

  @Post('saved/:shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Save a share' })
  @ApiResponse({ status: 200, description: 'Successfully saved the share' })
  @ApiResponse({ status: 404, description: 'Share not found' })
  addSavedShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.addSaved(shareId, req.userId);
  }

  @Delete('saved/:shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove saved share' })
  @ApiResponse({
    status: 200,
    description: 'Successfully removed the saved share',
  })
  @ApiResponse({ status: 404, description: 'Share not found' })
  removeSavedShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.deleteSaved(shareId, req.userId);
  }

  @Get('saved/:shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get all saved shares' })
  @ApiResponse({ status: 200, description: 'Returns all saved shares' })
  getSavedShares(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Query() query: QueryShareDto,
  ) {
    return this.shareService.getAllSaved(shareId, query);
  }

  @Get(':shareId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get a share by ID' })
  @ApiResponse({ status: 200, description: 'Returns the specified share' })
  @ApiResponse({ status: 404, description: 'Share not found' })
  getShare(@Param('shareId', ValidateObjectIdPipe) shareId: string) {
    return this.shareService.getShare(shareId);
  }
}
