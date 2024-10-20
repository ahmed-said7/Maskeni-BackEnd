import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardSearchDto } from './dto/dashboard.query.dto';
import { QueryAllService } from './query-all.service';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Dashboard All') // Tag for grouping in Swagger UI
@Controller('all')
export class QueryAllController {
  constructor(private readonly dashboardAllService: QueryAllService) {}

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardSearchDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all events.' })
  async getAllEvents(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllEvents(query);
  }

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardSearchDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all shares.' })
  async getAllShares(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllShares(query);
  }

  @Get('voluntary')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardSearchDto, required: false })
  @ApiResponse({ description: 'Retrieve all voluntary opportunities.' })
  async getAllVoluntary(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllVoluntary(query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardSearchDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all services.' })
  async getAllService(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllService(query);
  }

  @Get('posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardSearchDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all posts.' })
  async getAllPosts(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllPosts(query);
  }
  @Get('groups')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardSearchDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all groups.' })
  async getAllGroups(@Query() query: DashboardSearchDto) {
    return this.dashboardAllService.getAllGroups(query);
  }
}
