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
import { UpdateEventDto } from './dto/update.event.dto';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create.event.dto';
import { QueryEventDto } from './dto/query.event.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  createEvent(@Body() body: CreateEventDto, @Req() req: any) {
    return this.eventService.createEvent(body, req.userId);
  }
  @Get()
  getAllEvents(@Query() query: QueryEventDto) {
    return this.eventService.getAllEvents(query);
  }
  @Get('future')
  getFutureEvents(@Query() query: QueryEventDto, @Req() req: any) {
    return this.eventService.getAllFutureEvents(query, req.userId);
  }
  @Get('previous')
  getPreviousEvents(@Query() query: QueryEventDto, @Req() req: any) {
    return this.eventService.getAllPreviousReservedEvents(query, req.userId);
  }
  @Patch(':eventId')
  updateEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Body() body: UpdateEventDto,
    @Req() req: any,
  ) {
    return this.eventService.updateEvent(eventId, body, req.userId);
  }
  @Delete(':eventId')
  deleteEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.deleteEvent(eventId, req.userId);
  }
  @Post('comment/:eventId')
  createEventComment(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.eventService.addComment(body, eventId, req.userId);
  }
  @Get('comment/:eventId')
  getEventComment(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Query() query: FindQuery,
  ) {
    return this.eventService.getComments(eventId, query);
  }
  @Delete('comment/:commentId')
  deleteEventComment(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.eventService.removeComment(commentId, req.userId);
  }
  @Post('likes/:eventId')
  addEventLike(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.addLike(eventId, req.userId);
  }
  @Delete('likes/:eventId')
  removeEventLike(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.removeLike(eventId, req.userId);
  }
  @Get('likes/:eventId')
  getEventLikes(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Query() query: FindQuery,
  ) {
    return this.eventService.getLikes(eventId, query);
  }
  @Post('saved/:eventId')
  addSavedEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.addSaved(eventId, req.userId);
  }
  @Delete('saved/:eventId')
  removeSavedEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.deleteSaved(eventId, req.userId);
  }
  @Get('saved/:eventId')
  getSavedEvents(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Query() query: QueryEventDto,
  ) {
    return this.eventService.getAllSaved(eventId, query);
  }
  @Get(':eventId')
  getEvent(@Param('eventId', ValidateObjectIdPipe) eventId: string) {
    return this.eventService.getEvent(eventId);
  }
}
