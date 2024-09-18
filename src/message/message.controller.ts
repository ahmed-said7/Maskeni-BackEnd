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
import { CreateMessageDto } from './dto/create.message.dto';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update.message.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { QueryMessageDto } from './dto/query.message.dto';

@Controller('message')
export class MessageController {
  constructor(private msgService: MessageService) {}
  @Post()
  createMessage(@Body() body: CreateMessageDto, @Req() req: any) {
    return this.msgService.createMessage(body, req.userId);
  }
  @Get('scroll/:chatId')
  onScroll(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
    @Query() query: QueryMessageDto,
  ) {
    return this.msgService.onScroll(chatId, req.userId, query);
  }
  @Get(':chatId')
  getChatMessages(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
  ) {
    return this.msgService.getChatMessages(chatId, req.userId);
  }
  @Patch(':messageId')
  updateMessage(
    @Body() body: UpdateMessageDto,
    @Param('messageId', ValidateObjectIdPipe) messageId: string,
    @Req() req: any,
  ) {
    return this.msgService.updateMessage(messageId, body, req.userId);
  }
  @Delete(':messageId')
  deleteMessages(
    @Param('messageId', ValidateObjectIdPipe) messageId: string,
    @Req() req: any,
  ) {
    return this.msgService.deleteMessage(messageId, req.userId);
  }
}
