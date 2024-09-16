import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationAdminGuard } from 'src/common/guards/authentication.admin.guard';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { UserService } from './user.service';

@Controller('user/control')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  // @UseGuards(AuthenticationAdminGuard)
  getUsers(@Query() query: FindQuery) {
    return this.userService.getAllUsers(query);
  }
  @Delete(':userId')
  @UseGuards(AuthenticationAdminGuard)
  deleteUser(@Param('userId', ValidateObjectIdPipe) adminId: string) {
    return this.userService.deleteUser(adminId);
  }

  @Get(':userId')
  @UseGuards(AuthenticationAdminGuard)
  getUser(@Param('userId', ValidateObjectIdPipe) userId: string) {
    return this.userService.getUser(userId);
  }
}
