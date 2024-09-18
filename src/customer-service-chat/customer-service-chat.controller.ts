import { Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { CustomerServiceChatService } from './customer-service-chat.service';
import { FindQuery } from 'src/common/types';

@Controller('customer-service-chat')
export class CustomerServiceChatController {
  constructor(private chatService: CustomerServiceChatService) {}

  @Post()
  createChat(@Req() req: any) {
    return this.chatService.createChat(req.userId);
  }

  @Get()
  getUserChats(@Query() query: FindQuery) {
    return this.chatService.getChats(query);
  }

  @Get(':id')
  getChatMembers(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Req() req: any,
  ) {
    return this.chatService.getChatMemebers(req.userId);
  }
}
