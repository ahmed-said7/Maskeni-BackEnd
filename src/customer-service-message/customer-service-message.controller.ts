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
import { ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Customer Service Message') // Tag for grouping in Swagger UI
@Controller('customer-service-message')
export class CustomerServiceMessageController {
  constructor(private msgService: CustomerServiceMessageService) {}

  @Post()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User, All_Role.Admin, All_Role.SuperAdmin)
  @ApiResponse({ status: 201, description: 'Message created successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  createMessage(@Body() body: CreateMessageDto, @Req() req: any) {
    return this.msgService.createMessage(body, req.userId, req.role);
  }

  @Post('admin-msg/:user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiParam({ name: 'user', description: 'ID of the user to send message' }) // Document path parameter
  @ApiResponse({ status: 200, description: 'Message sent by admin.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
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
  @ApiParam({
    name: 'chatId',
    description: 'ID of the chat for scrolling messages',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset for pagination',
  }) // Document query parameter
  @ApiResponse({ status: 200, description: 'Messages scrolled successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  onScroll(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
    @Query() query: QueryMessageDto,
  ) {
    return this.msgService.onScroll(chatId, req.userId, query);
  }

  // @Get('user-join/:chatId')
  // @UseGuards(AuthenticationGuard, AuthorizationGuard)
  // @Roles(All_Role.User)
  // @ApiParam({ name: 'chatId', description: 'ID of the chat to join as user' })
  // @ApiResponse({ status: 200, description: 'User joined chat successfully.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // joinUser(
  //   @Param('chatId', ValidateObjectIdPipe) chatId: string,
  //   @Req() req: any,
  // ) {
  //   return this.msgService.joinChatByUser(chatId, req.userId);
  // }

  @Get('admin-join/:chatId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiParam({ name: 'chatId', description: 'ID of the chat to join as admin' })
  @ApiResponse({ status: 200, description: 'Admin joined chat successfully.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  joinAdmin(
    @Param('chatId', ValidateObjectIdPipe) chatId: string,
    @Req() req: any,
  ) {
    return this.msgService.joinChatByAdmin(chatId, req.userId);
  }
}
