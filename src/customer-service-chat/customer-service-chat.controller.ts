import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { CustomerServiceChatService } from './customer-service-chat.service';
import { FindQuery } from 'src/common/types';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { Roles } from 'src/common/decorator/roles';

@Controller('customer-service-chat')
export class CustomerServiceChatController {
  constructor(private chatService: CustomerServiceChatService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User, All_Role.Admin, All_Role.SuperAdmin)
  createChat(@Req() req: any) {
    return this.chatService.createChat(req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  getUserChats(@Query() query: FindQuery) {
    return this.chatService.getChats(query);
  }

  @Get(':id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User, All_Role.Admin, All_Role.SuperAdmin)
  getChatMembers(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Req() req: any,
  ) {
    return this.chatService.getChatMemebers(req.userId);
  }
}
