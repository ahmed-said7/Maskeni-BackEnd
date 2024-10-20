import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardAcceptedDto } from './dto/dashboard.query.dto';
import { DashboardAcceptedService } from './query-accepted.service';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { Roles } from 'src/common/decorator/roles';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Dashboard Accepted') // Tag for grouping in Swagger UI
@Controller('accepted')
export class DashboardAcceptedController {
  constructor(
    private readonly dashboardAcceptedService: DashboardAcceptedService,
  ) {}

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardAcceptedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all accepted events.' })
  async getAllAcceptedEvents(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedEvents(query);
  }

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardAcceptedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all accepted shares.' })
  async getAllAcceptedShares(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedShares(query);
  }

  @Get('voluntary')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardAcceptedDto, required: false })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all accepted voluntary opportunities.',
  })
  async getAllAcceptedVoluntary(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedVoluntary(query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardAcceptedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all accepted services.' })
  async getAllAcceptedService(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedService(query);
  }

  @Get('posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardAcceptedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all accepted posts.' })
  async getAllAcceptedPosts(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedPosts(query);
  }
  @Get('groups')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardAcceptedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all accepted groups.' })
  async getAllAcceptedGroups(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedGroups(query);
  }
}
