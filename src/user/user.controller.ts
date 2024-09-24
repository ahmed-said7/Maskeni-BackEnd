import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { UserService } from './user.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';

@ApiTags('User Control') // Grouping the endpoints under a common tag
@Controller('user/control')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/all')
  @ApiOperation({ summary: 'Get all users' }) // Summary for the endpoint
  getUsers(@Query() query: FindQuery) {
    return this.userService.getAllUsers(query);
  }

  @Get(':userId')
  @UseGuards(AuthenticationGuard)
  @ApiOperation({ summary: 'Get a user by ID' }) // Summary for the endpoint
  getUser(@Param('userId', ValidateObjectIdPipe) userId: string) {
    return this.userService.getUser(userId);
  }

  @Patch(':userId')
  @UseGuards(AuthenticationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiOperation({ summary: 'Block a user by ID' }) // Summary for the endpoint
  blockUser(@Param('userId', ValidateObjectIdPipe) userId: string) {
    return this.userService.blockUser(userId);
  }
}
