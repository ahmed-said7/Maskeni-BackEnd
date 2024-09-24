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
import { CreateMessageDto } from './dto/create.message.dto';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update.message.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { QueryMessageDto } from './dto/query.message.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('messages') // Grouping related endpoints
@Controller('message')
export class MessageController {
  constructor(private msgService: MessageService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({ status: 201, description: 'Message created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createMessage(@Body() body: CreateMessageDto, @Req() req: any) {
    return this.msgService.createMessage(body, req.userId);
  }

  @Get('scroll/:chatId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Load more messages for a chat' })
  @ApiResponse({ status: 200, description: 'Messages loaded successfully' })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  async onScroll(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
    @Query() query: QueryMessageDto,
  ) {
    return this.msgService.onScroll(chatId, req.userId, query);
  }

  @Get(':chatId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get all messages for a chat' })
  @ApiResponse({
    status: 200,
    description: 'Chat messages retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Chat not found' })
  async getChatMessages(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
  ) {
    return this.msgService.getChatMessages(chatId, req.userId);
  }

  @Patch(':messageId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update a message' })
  @ApiResponse({ status: 200, description: 'Message updated successfully' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  async updateMessage(
    @Body() body: UpdateMessageDto,
    @Param('messageId', ValidateObjectIdPipe) messageId: string,
    @Req() req: any,
  ) {
    return this.msgService.updateMessage(messageId, body, req.userId);
  }

  @Delete(':messageId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete a message' })
  @ApiResponse({ status: 200, description: 'Message deleted successfully' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  async deleteMessages(
    @Param('messageId', ValidateObjectIdPipe) messageId: string,
    @Req() req: any,
  ) {
    return this.msgService.deleteMessage(messageId, req.userId);
  }
}
