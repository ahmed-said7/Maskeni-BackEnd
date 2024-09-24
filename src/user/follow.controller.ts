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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';

@ApiTags('User Follow') // Grouping the endpoints under a common tag
@Controller('user/follow')
export class UserFollowController {
  constructor(private userService: UserService) {}

  @Post(':user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Follow a user' }) // Summary for the endpoint
  addFollow(@Req() req: any, @Param('user', ValidateObjectIdPipe) id: string) {
    return this.userService.addFollow(id, req.userId);
  }

  @Delete(':user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Unfollow a user' }) // Summary for the endpoint
  removeFollow(
    @Req() req: any,
    @Param('user', ValidateObjectIdPipe) id: string,
  ) {
    return this.userService.removeFollow(id, req.userId);
  }

  @Get('follower/:user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get followers of a user' }) // Summary for the endpoint
  getFollowers(
    @Param('user', ValidateObjectIdPipe) id: string,
    @Query() query: FindQuery,
  ) {
    return this.userService.getUserFollowers(id, query);
  }

  @Get('following/:user')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get users followed by a user' }) // Summary for the endpoint
  getFollowing(
    @Param('user', ValidateObjectIdPipe) id: string,
    @Query() query: FindQuery,
  ) {
    return this.userService.getUserFollwing(id, query);
  }
}
