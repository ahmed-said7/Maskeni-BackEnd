import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create.chat';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  createChat(@Body() body: CreateChatDto, @Req() req: any) {
    return this.chatService.createChat(body, req.userId);
  }

  @Get()
  getUserChats(@Query() query: FindQuery, @Req() req: any) {
    return this.chatService.getChats(query, req.userId);
  }

  @Delete(':id')
  deleteChat(@Param('id', ValidateObjectIdPipe) id: string, @Req() req: any) {
    return this.chatService.deleteChat(id, req.userId);
  }

  @Get(':id')
  getChatMembers(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Req() req: any,
  ) {
    return this.chatService.getChatMemebers(id, req.userId);
  }
}
