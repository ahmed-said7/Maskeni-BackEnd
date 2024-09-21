import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';

@Controller('user/follow')
export class UserFollowController {
  constructor(private userService: UserService) {}

  @Post(':user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  addFollow(@Req() req: any, @Param('user', ValidateObjectIdPipe) id: string) {
    return this.userService.addFollow(id, req.userId);
  }
  @Delete(':user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  removeFollow(
    @Req() req: any,
    @Param('user', ValidateObjectIdPipe) id: string,
  ) {
    return this.userService.removeFollow(id, req.userId);
  }

  @Get('follower/:user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getFollowers(
    @Param('user', ValidateObjectIdPipe) id: string,
    @Query() query: FindQuery,
  ) {
    return this.userService.getUserFollowers(id, query);
  }

  @Get('following/:user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getFollowing(
    @Param('user', ValidateObjectIdPipe) id: string,
    @Query() query: FindQuery,
  ) {
    return this.userService.getUserFollwing(id, query);
  }
}
