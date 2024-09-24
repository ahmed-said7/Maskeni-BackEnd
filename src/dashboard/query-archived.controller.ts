import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardArchivedDto } from './dto/dashboard.query.dto';
import { DashboardArchivedService } from './query-archived.service';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { Roles } from 'src/common/decorator/roles';

@Controller('archived')
export class DashboardArchivedController {
  constructor(
    private readonly dashboardArchivedService: DashboardArchivedService,
  ) {}

  @Get('questions')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllArchivedQuestions(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedQuestions(query);
  }

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllArchivedEvents(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedEvents(query);
  }

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllArchivedShares(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedShares(query);
  }

  @Get('voluntary')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllArchivedVoluntary(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedVoluntary(query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllArchivedService(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedService(query);
  }

  @Get('posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllArchivedPosts(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedPosts(query);
  }
}
