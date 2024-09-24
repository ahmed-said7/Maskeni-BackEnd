import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardSearchDto } from './dto/dashboard.query.dto';
import { QueryAllService } from './query-all.service';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('all')
export class QueryAllController {
  constructor(private readonly dashboardAllService: QueryAllService) {}

  @Get('questions')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllQuestions(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllQuestions(query);
  }

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllEvents(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllEvents(query);
  }

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllShares(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllShares(query);
  }

  @Get('voluntary')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllVoluntary(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllVoluntary(query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllService(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllService(query);
  }

  @Get('posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllPosts(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllPosts(query);
  }
}
