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
import { CreateOfferedDto } from './dto/create.service.dto';
import { QueryOfferedDto } from './dto/query.service.dto';
import { UpdateOfferedDto } from './dto/update.service.dto';
import { OfferedService } from './offered-service.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';

@Controller('service')
export class OfferedController {
  constructor(private offeredService: OfferedService) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  async getMyDeletedServices(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.offeredService.getMyDeletedServices(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  async getMyArchivedServices(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.offeredService.getMyArchivedServices(query, userId);
  }
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createEvent(@Body() body: CreateOfferedDto, @Req() req: any) {
    return this.offeredService.createService(body, req.userId);
  }
  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getAllservices(@Query() query: QueryOfferedDto) {
    return this.offeredService.getAllservices(query);
  }
  @Patch(':serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateservice(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Body() body: UpdateOfferedDto,
    @Req() req: any,
  ) {
    return this.offeredService.updateService(serviceId, body, req.userId);
  }
  @Delete(':serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteservice(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.deleteService(serviceId, req.userId);
  }
  @Post('comment/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createserviceComment(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.offeredService.addComment(body, serviceId, req.userId);
  }
  @Get('comment/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getserviceComment(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getComments(serviceId, query);
  }
  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteserviceComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.offeredService.removeComment(commentId, req.userId);
  }
  @Post('likes/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addserviceLike(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.addLike(serviceId, req.userId);
  }
  @Delete('likes/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeserviceLike(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.removeLike(serviceId, req.userId);
  }
  @Get('likes/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getserviceLikes(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getLikes(serviceId, query);
  }
  @Post('saved/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addSavedservice(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.addSaved(serviceId, req.userId);
  }
  @Delete('saved/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeSavedservice(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.deleteSaved(serviceId, req.userId);
  }
  @Get('saved/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getSavedservices(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getAllSaved(serviceId, query);
  }
  @Get(':serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getservice(@Param('serviceId', ValidateObjectIdPipe) serviceId: string) {
    return this.offeredService.getService(serviceId);
  }
  @Post('request/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  requestService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.addRequested(serviceId, req.userId);
  }
  @Delete('request/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeRequestService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.deleteRequested(serviceId, req.userId);
  }
  @Get('request/:serviceId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getSavedRequested(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getAllRequested(serviceId, query);
  }
}
