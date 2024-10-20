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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Feed') // Tag for grouping related operations
// @ApiBearerAuth() // Adds Bearer Auth requirement
@Controller('feed')
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  async getMyDeletedShare(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // Assuming user ID is stored in the request object
    return this.shareService.getMyDeletdShare(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  async getMyArchivedShare(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // Assuming user ID is stored in the request object
    return this.shareService.getMyArcivedShare(query, userId);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createShare(@Body() body: CreateShareDto, @Req() req: any) {
    return this.shareService.createShare(body, req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getAllShare(@Query() query: QueryShareDto, @Req() req: any) {
    return this.shareService.getAllShare(query, req.userId);
  }
  @Get('profile')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getAllShareProfile(@Query() query: QueryShareDto, @Req() req: any) {
    query.user = req.userId;
    return this.shareService.getAllShare(query, req.userId);
  }

  @Patch(':shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Body() body: UpdateShareDto,
    @Req() req: any,
  ) {
    return this.shareService.updateShare(shareId, body, req.userId);
  }

  @Delete(':shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.deleteShare(shareId, req.userId);
  }

  @Post('comment/:shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createShareComment(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.shareService.addComment(body, shareId, req.userId);
  }

  @Get('comment/:shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getShareComment(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Query() query: FindQuery,
  ) {
    return this.shareService.getComments(shareId, query);
  }

  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteShareComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.shareService.removeComment(commentId, req.userId);
  }

  @Post('likes/:shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addShareLike(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.addLike(shareId, req.userId);
  }

  @Delete('likes/:shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeShareLike(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.removeLike(shareId, req.userId);
  }

  @Get('likes/:shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getShareLikes(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Query() query: FindQuery,
  ) {
    return this.shareService.getLikes(shareId, query);
  }

  @Post('saved/:shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addSavedShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.addSaved(shareId, req.userId);
  }

  @Delete('saved/:shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeSavedShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.deleteSaved(shareId, req.userId);
  }

  @Get('saved/:shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getSavedShares(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Query() query: QueryShareDto,
  ) {
    return this.shareService.getAllSaved(shareId, query);
  }

  @Get(':shareId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getShare(
    @Param('shareId', ValidateObjectIdPipe) shareId: string,
    @Req() req: any,
  ) {
    return this.shareService.getShare(shareId, req.userId);
  }
}
