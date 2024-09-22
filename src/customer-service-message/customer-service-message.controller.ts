import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  CreateAdminMessageDto,
  CreateMessageDto,
} from './dto/create.message.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { QueryMessageDto } from './dto/query.message.dto';
import { CustomerServiceMessageService } from './customer-service-message.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';

@Controller('customer-service-message')
export class CustomerServiceMessageController {
  constructor(private msgService: CustomerServiceMessageService) {}
  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User, All_Role.Admin, All_Role.SuperAdmin)
  createMessage(@Body() body: CreateMessageDto, @Req() req: any) {
    return this.msgService.createMessage(body, req.userId, req.role);
  }
  @Get('admin-msg/:user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User, All_Role.Admin, All_Role.SuperAdmin)
  adminMessage(
    @Param('user', ValidateObjectIdPipe) user: string,
    @Req() req: any,
    @Body() body: CreateAdminMessageDto,
  ) {
    return this.msgService.sendMessageByAdmin(body, user, req.userId);
  }
  @Get('scroll/:chatId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User, All_Role.Admin, All_Role.SuperAdmin)
  onScroll(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
    @Query() query: QueryMessageDto,
  ) {
    return this.msgService.onScroll(chatId, req.userId, query);
  }
  @Get('user-join/:chatId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User, All_Role.Admin, All_Role.SuperAdmin)
  joinUser(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
  ) {
    return this.msgService.joinChatByUser(chatId, req.userId);
  }
  @Get('admin-join/:chatId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User, All_Role.Admin, All_Role.SuperAdmin)
  joinAdmin(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
  ) {
    return this.msgService.joinChatByAdmin(chatId, req.userId);
  }
}
