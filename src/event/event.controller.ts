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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get('deleted')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get deleted events for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of deleted events.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getMyDeletedEvents(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId; // assuming user ID is stored in the request object
    return this.eventService.getMyDeletedEvents(query, userId);
  }

  @Get('archived')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get archived events for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of archived events.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getMyArchivedEvents(@Query() query: FindQuery, @Req() req: any) {
    const userId = req.userId;
    return this.eventService.getMyArchivedEvents(query, userId);
  }

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createEvent(@Body() body: CreateEventDto, @Req() req: any) {
    return this.eventService.createEvent(body, req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'List of all events.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAllEvents(@Query() query: QueryEventDto) {
    return this.eventService.getAllEvents(query);
  }

  @Get('future')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get future events for the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of future events.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getFutureEvents(@Query() query: QueryEventDto, @Req() req: any) {
    return this.eventService.getAllFutureEvents(query, req.userId);
  }

  @Get('previous')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({
    summary: 'Get previous reserved events for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'List of previous reserved events.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getPreviousEvents(@Query() query: QueryEventDto, @Req() req: any) {
    return this.eventService.getAllPreviousReservedEvents(query, req.userId);
  }

  @Patch(':eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update an event by ID' })
  @ApiResponse({ status: 200, description: 'Event updated successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async updateEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Body() body: UpdateEventDto,
    @Req() req: any,
  ) {
    return this.eventService.updateEvent(eventId, body, req.userId);
  }

  @Delete(':eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete an event by ID' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async deleteEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.deleteEvent(eventId, req.userId);
  }

  @Post('comment/:eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Add a comment to an event' })
  @ApiResponse({ status: 201, description: 'Comment added successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createEventComment(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Body() body: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.eventService.addComment(body, eventId, req.userId);
  }

  @Get('comment/:eventId')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Get comments for an event' })
  @ApiResponse({ status: 200, description: 'List of comments for the event.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async getEventComment(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Query() query: FindQuery,
  ) {
    return this.eventService.getComments(eventId, query);
  }

  @Delete('comment/:commentId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Comment not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async deleteEventComment(
    @Param('commentId', ValidateObjectIdPipe) commentId: string,
    @Req() req: any,
  ) {
    return this.eventService.removeComment(commentId, req.userId);
  }

  @Post('likes/:eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Like an event' })
  @ApiResponse({ status: 200, description: 'Event liked successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async addEventLike(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.addLike(eventId, req.userId);
  }

  @Delete('likes/:eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove like from an event' })
  @ApiResponse({ status: 200, description: 'Like removed successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async removeEventLike(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.removeLike(eventId, req.userId);
  }

  @Get('likes/:eventId')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Get likes for an event' })
  @ApiResponse({ status: 200, description: 'List of likes for the event.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async getEventLikes(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Query() query: FindQuery,
  ) {
    return this.eventService.getLikes(eventId, query);
  }

  @Post('saved/:eventId')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Save an event' })
  @ApiResponse({ status: 200, description: 'Event saved successfully.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async addSavedEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.addSaved(eventId, req.userId);
  }

  @Delete('saved/:eventId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Remove saved event' })
  @ApiResponse({
    status: 200,
    description: 'Saved event removed successfully.',
  })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async removeSavedEvent(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Req() req: any,
  ) {
    return this.eventService.deleteSaved(eventId, req.userId);
  }

  @Get('saved/:eventId')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Get saved events' })
  @ApiResponse({ status: 200, description: 'List of saved events.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async getSavedEvents(
    @Param('eventId', ValidateObjectIdPipe) eventId: string,
    @Query() query: QueryEventDto,
  ) {
    return this.eventService.getAllSaved(eventId, query);
  }

  @Get(':eventId')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Get an event by ID' })
  @ApiResponse({ status: 200, description: 'Event details.' })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  async getEvent(@Param('eventId', ValidateObjectIdPipe) eventId: string) {
    return this.eventService.getEvent(eventId);
  }
}
