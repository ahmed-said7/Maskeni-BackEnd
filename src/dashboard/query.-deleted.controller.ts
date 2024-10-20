import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardDeletedDto } from './dto/dashboard.query.dto';
import { DashboardDeletedService } from './query-deleted.service';
import { All_Role } from 'src/common/enum';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Dashboard Soft Deleted') // Tag for grouping in Swagger UI
@Controller('soft-deleted')
export class DashboardDeletedController {
  constructor(
    private readonly dashboardDeletedService: DashboardDeletedService,
  ) {}

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardDeletedDto, required: false })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all soft-deleted events.',
  })
  async getAllDeletedEvents(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedEvents(query);
  }

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardDeletedDto, required: false })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all soft-deleted shares.',
  })
  async getAllDeletedShares(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedShares(query);
  }

  @Get('voluntary')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardDeletedDto, required: false })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all soft-deleted voluntary opportunities.',
  })
  async getAllDeletedVoluntary(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedVoluntary(query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardDeletedDto, required: false })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all soft-deleted services.',
  })
  async getAllDeletedService(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedService(query);
  }

  @Get('posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardDeletedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all soft-deleted posts.' })
  async getAllDeletedPosts(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedPosts(query);
  }
  @Get('groups')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardDeletedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all soft-deleted group.' })
  async getAllDeletedGroups(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedGroup(query);
  }
}
