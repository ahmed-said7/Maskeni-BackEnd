import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import {
  CreateAdminMessageDto,
  CreateMessageDto,
} from './dto/create.message.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { QueryMessageDto } from './dto/query.message.dto';
import { CustomerServiceMessageService } from './customer-service-message.service';

@Controller('customer-service-message')
export class CustomerServiceMessageController {
  constructor(private msgService: CustomerServiceMessageService) {}
  @Post()
  createMessage(@Body() body: CreateMessageDto, @Req() req: any) {
    return this.msgService.createMessage(body, req.userId, req.role);
  }
  @Get('admin-msg/:user')
  adminMessage(
    @Param('user', ValidateObjectIdPipe) user: string,
    @Req() req: any,
    @Body() body: CreateAdminMessageDto,
  ) {
    return this.msgService.sendMessageByAdmin(body, user, req.userId);
  }
  @Get('scroll/:chatId')
  onScroll(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
    @Query() query: QueryMessageDto,
  ) {
    return this.msgService.onScroll(chatId, req.userId, query);
  }
  @Get('user-join/:chatId')
  joinUser(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
  ) {
    return this.msgService.joinChatByUser(chatId, req.userId);
  }
  @Get('admin-join/:chatId')
  joinAdmin(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
  ) {
    return this.msgService.joinChatByAdmin(chatId, req.userId);
  }
}
