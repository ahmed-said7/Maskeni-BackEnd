import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardDeletedDto } from './dto/dashboard.query.dto';
import { DashboardDeletedService } from './query-deleted.service';
import { All_Role } from 'src/common/enum';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';

@Controller('soft-deleted')
export class DashboardDeletedController {
  constructor(
    private readonly dashboardDeletedService: DashboardDeletedService,
  ) {}

  @Get('questions')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllDeletedQuestions(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedQuestions(query);
  }

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllDeletedEvents(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedEvents(query);
  }

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllDeletedShares(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedShares(query);
  }

  @Get('voluntary')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllDeletedVoluntary(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedVoluntary(query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllDeletedService(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedService(query);
  }

  @Get('posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllDeletedPosts(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedPosts(query);
  }
}
