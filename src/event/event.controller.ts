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
import { UpdateEventDto } from './dto/update.event.dto';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create.event.dto';
import { QueryEventDto } from './dto/query.event.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { CreateCommentDto } from 'src/comment/dto/create.comment.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}
  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  async getMyDeletedEvents(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.eventService.getMyDeletedEvents(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  async getMyArchivedEvents(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.eventService.getMyArchivedEvents(query, userId);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createEvent(@Body() body: CreateEventDto, @Req() req: any) {
    return this.eventService.createEvent(body, req.userId);
  }
  @Get()
  @UseGuards(AuthenticationGuard)
  // @Roles(All_Role.User)
  getAllEvents(@Query() query: QueryEventDto) {
    return this.eventService.getAllEvents(query);
  }
  @Get('future')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getFutureEvents(@Query() query: QueryEventDto, @Req() req: any) {
    return this.eventService.getAllFutureEvents(query, req.userId);
  }
  @Get('previous')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getPreviousEvents(@Query() query: QueryEventDto, @Req() req: any) {
    return this.eventService.getAllPreviousReservedEvents(query, req.userId);
  }
  @Patch(':eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Body() body: UpdateEventDto,
    @Req() req: any,
  ) {
    return this.eventService.updateEvent(eventId, body, req.userId);
  }
  @Delete(':eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.deleteEvent(eventId, req.userId);
  }
  @Post('comment/:eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createEventComment(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.eventService.addComment(body, eventId, req.userId);
  }
  @Get('comment/:eventId')
  @UseGuards(AuthenticationGuard)
  getEventComment(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Query() query: FindQuery,
  ) {
    return this.eventService.getComments(eventId, query);
  }
  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteEventComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.eventService.removeComment(commentId, req.userId);
  }
  @Post('likes/:eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addEventLike(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.addLike(eventId, req.userId);
  }
  @Delete('likes/:eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeEventLike(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.removeLike(eventId, req.userId);
  }
  @Get('likes/:eventId')
  @UseGuards(AuthenticationGuard)
  // @Roles(All_Role.User)
  getEventLikes(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Query() query: FindQuery,
  ) {
    return this.eventService.getLikes(eventId, query);
  }
  @Post('saved/:eventId')
  @UseGuards(AuthenticationGuard)
  // @Roles(All_Role.User)
  addSavedEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.addSaved(eventId, req.userId);
  }
  @Delete('saved/:eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeSavedEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.deleteSaved(eventId, req.userId);
  }
  @Get('saved/:eventId')
  @UseGuards(AuthenticationGuard)
  // @Roles(All_Role.User)
  getSavedEvents(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Query() query: QueryEventDto,
  ) {
    return this.eventService.getAllSaved(eventId, query);
  }
  @Get(':eventId')
  @UseGuards(AuthenticationGuard)
  // @Roles(All_Role.User)
  getEvent(@Param('eventId', ValidateObjectIdPipe) eventId: string) {
    return this.eventService.getEvent(eventId);
  }
}
