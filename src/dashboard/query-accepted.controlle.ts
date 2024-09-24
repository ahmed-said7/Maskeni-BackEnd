import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardAcceptedDto } from './dto/dashboard.query.dto';
import { DashboardAcceptedService } from './query-accepted.service';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { Roles } from 'src/common/decorator/roles';

@Controller('accepted')
export class DashboardAcceptedController {
  constructor(
    private readonly dashboardAcceptedService: DashboardAcceptedService,
  ) {}

  @Get('questions')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllAcceptedQuestions(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedQuestions(query);
  }

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllAcceptedEvents(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedEvents(query);
  }

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllAcceptedShares(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedShares(query);
  }

  @Get('voluntary')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllAcceptedVoluntary(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedVoluntary(query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllAcceptedService(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedService(query);
  }

  @Get('posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllAcceptedPosts(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedPosts(query);
  }
}
