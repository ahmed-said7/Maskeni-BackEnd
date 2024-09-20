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
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { CreateOfferedDto } from './dto/create.service.dto';
import { QueryOfferedDto } from './dto/query.service.dto';
import { UpdateOfferedDto } from './dto/update.service.dto';
import { OfferedService } from './offered-service.service';

@Controller('service')
export class OfferedController {
  constructor(private offeredService: OfferedService) {}

  @Post()
  createEvent(@Body() body: CreateOfferedDto, @Req() req: any) {
    return this.offeredService.createService(body, req.userId);
  }
  @Get()
  getAllservices(@Query() query: QueryOfferedDto) {
    return this.offeredService.getAllservices(query);
  }
  @Patch(':serviceId')
  updateservice(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Body() body: UpdateOfferedDto,
    @Req() req: any,
  ) {
    return this.offeredService.updateService(serviceId, body, req.userId);
  }
  @Delete(':serviceId')
  deleteservice(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.deleteService(serviceId, req.userId);
  }
  @Post('comment/:serviceId')
  createserviceComment(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.offeredService.addComment(body, serviceId, req.userId);
  }
  @Get('comment/:serviceId')
  getserviceComment(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getComments(serviceId, query);
  }
  @Delete('comment/:commentId')
  deleteserviceComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.offeredService.removeComment(commentId, req.userId);
  }
  @Post('likes/:serviceId')
  addserviceLike(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.addLike(serviceId, req.userId);
  }
  @Delete('likes/:serviceId')
  removeserviceLike(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.removeLike(serviceId, req.userId);
  }
  @Get('likes/:serviceId')
  getserviceLikes(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getLikes(serviceId, query);
  }
  @Post('saved/:serviceId')
  addSavedservice(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.addSaved(serviceId, req.userId);
  }
  @Delete('saved/:serviceId')
  removeSavedservice(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.deleteSaved(serviceId, req.userId);
  }
  @Get('saved/:serviceId')
  getSavedservices(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getAllSaved(serviceId, query);
  }
  @Get(':serviceId')
  getservice(@Param('serviceId', ValidateObjectIdPipe) serviceId: string) {
    return this.offeredService.getService(serviceId);
  }
  @Post('request/:serviceId')
  requestService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.addRequested(serviceId, req.userId);
  }
  @Delete('request/:serviceId')
  removeRequestService(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Req() req: any,
  ) {
    return this.offeredService.deleteRequested(serviceId, req.userId);
  }
  @Get('request/:serviceId')
  getSavedRequested(
    @Param('serviceId', ValidateObjectIdPipe) serviceId: string,
    @Query() query: FindQuery,
  ) {
    return this.offeredService.getAllRequested(serviceId, query);
  }
}
