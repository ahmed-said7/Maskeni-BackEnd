import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FindQuery } from 'src/common/types';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@ApiTags('User Saved') // Grouping the endpoints under a common tag
@Controller('user/favorite')
export class UserFavoriteController {
  constructor(private readonly userService: UserService) {}

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved shares' }) // Summary for the endpoint
  async getUserFavoriteShare(@Req() req: any, @Query() query: FindQuery) {
    return this.userService.getUserFavoriteShare(req.userId, query);
  }

  @Get('voluntaries')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved voluntary activities' }) // Summary for the endpoint
  async getUserFavoriteVoluntary(@Req() req: any, @Query() query: FindQuery) {
    return this.userService.getUserFavoriteVoluntary(req.userId, query);
  }

  @Get('group-posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved group posts' }) // Summary for the endpoint
  async getUserFavoriteGroupPosts(@Req() req: any, @Query() query: FindQuery) {
    return this.userService.getUserFavoriteGroupPosts(req.userId, query);
  }

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved events' }) // Summary for the endpoint
  async getUserFavoriteEvent(@Req() req: any, @Query() query: FindQuery) {
    return this.userService.getUserFavoriteEvent(req.userId, query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved services' }) // Summary for the endpoint
  async getUserFavoriteService(@Req() req: any, @Query() query: FindQuery) {
    return this.userService.getUserFavoriteService(req.userId, query);
  }
}
