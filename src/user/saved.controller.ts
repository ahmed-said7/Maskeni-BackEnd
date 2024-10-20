import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FindQuery } from 'src/common/types';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@ApiTags('User Saved') // Grouping the endpoints under a common tag
@Controller('user/saved')
export class UserSavedController {
  constructor(private readonly userSavedService: UserService) {}

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved shares' }) // Summary for the endpoint
  async getUserSavedShare(@Req() req: any, @Query() query: FindQuery) {
    return this.userSavedService.getUserSavedShare(req.userId, query);
  }

  @Get('voluntaries')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved voluntary activities' }) // Summary for the endpoint
  async getUserSavedVoluntary(@Req() req: any, @Query() query: FindQuery) {
    return this.userSavedService.getUserSavedVoluntary(req.userId, query);
  }

  @Get('group-posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved group posts' }) // Summary for the endpoint
  async getUserSavedGroupPosts(@Req() req: any, @Query() query: FindQuery) {
    return this.userSavedService.getUserSavedGroupPosts(req.userId, query);
  }

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved events' }) // Summary for the endpoint
  async getUserSavedEvent(@Req() req: any, @Query() query: FindQuery) {
    return this.userSavedService.getUserSavedEvent(req.userId, query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user saved services' }) // Summary for the endpoint
  async getUserSavedService(@Req() req: any, @Query() query: FindQuery) {
    return this.userSavedService.getUserSavedService(req.userId, query);
  }

  @Get('requested/services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user requested services' }) // Summary for the endpoint
  async getUserRequestedService(@Req() req: any, @Query() query: FindQuery) {
    return this.userSavedService.getUserRequestedService(req.userId, query);
  }
}
