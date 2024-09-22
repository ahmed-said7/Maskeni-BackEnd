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

@Controller('message')
export class MessageController {
  constructor(private msgService: MessageService) {}
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  createMessage(@Body() body: CreateMessageDto, @Req() req: any) {
    return this.msgService.createMessage(body, req.userId);
  }
  @Get('scroll/:chatId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  onScroll(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
    @Query() query: QueryMessageDto,
  ) {
    return this.msgService.onScroll(chatId, req.userId, query);
  }
  @Get(':chatId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getChatMessages(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
  ) {
    return this.msgService.getChatMessages(chatId, req.userId);
  }
  @Patch(':messageId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateMessage(
    @Body() body: UpdateMessageDto,
    @Param('messageId', ValidateObjectIdPipe) messageId: string,
    @Req() req: any,
  ) {
    return this.msgService.updateMessage(messageId, body, req.userId);
  }
  @Delete(':messageId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteMessages(
    @Param('messageId', ValidateObjectIdPipe) messageId: string,
    @Req() req: any,
  ) {
    return this.msgService.deleteMessage(messageId, req.userId);
  }
}
