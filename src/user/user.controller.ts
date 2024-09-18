import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { UserService } from './user.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';

@Controller('user/control')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  // @UseGuards(AuthenticationGuard)
  getUsers(@Query() query: FindQuery) {
    return this.userService.getAllUsers(query);
  }

  @Get(':userId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  getUser(@Param('userId', ValidateObjectIdPipe) userId: string) {
    return this.userService.getUser(userId);
  }
  @Patch(':userId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  blockUser(@Param('userId', ValidateObjectIdPipe) userId: string) {
    return this.userService.blockUser(userId);
  }
}
