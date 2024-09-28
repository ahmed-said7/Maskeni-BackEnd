import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardArchivedDto } from './dto/dashboard.query.dto';
import { DashboardArchivedService } from './query-archived.service';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { Roles } from 'src/common/decorator/roles';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Dashboard Archived') // Tag for grouping in Swagger UI
@Controller('archived')
export class DashboardArchivedController {
  constructor(
    private readonly dashboardArchivedService: DashboardArchivedService,
  ) {}

  @Get('questions')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardArchivedDto, required: false }) // Document query parameters
  @ApiResponse({ status: 200, description: 'Retrieve all archived questions.' }) // Document response
  async getAllArchivedQuestions(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedQuestions(query);
  }

  @Get('events')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardArchivedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all archived events.' })
  async getAllArchivedEvents(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedEvents(query);
  }

  @Get('shares')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardArchivedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all archived shares.' })
  async getAllArchivedShares(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedShares(query);
  }

  @Get('voluntary')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardArchivedDto, required: false })
  @ApiResponse({
    status: 200,
    description: 'Retrieve all archived voluntary opportunities.',
  })
  async getAllArchivedVoluntary(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedVoluntary(query);
  }

  @Get('services')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardArchivedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all archived services.' })
  async getAllArchivedService(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedService(query);
  }

  @Get('posts')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardArchivedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all archived posts.' })
  async getAllArchivedPosts(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedPosts(query);
  }
  @Get('groups')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiQuery({ type: DashboardArchivedDto, required: false })
  @ApiResponse({ status: 200, description: 'Retrieve all archived groups.' })
  async getAllArchivedGroups(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedGroups(query);
  }
}
