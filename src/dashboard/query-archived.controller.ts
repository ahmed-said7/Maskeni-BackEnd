import { Controller, Get, Query } from '@nestjs/common';
import { DashboardArchivedDto } from './dto/dashboard.query.dto';
import { DashboardArchivedService } from './query-archived.service';

@Controller('archived')
export class DashboardArchivedController {
  constructor(
    private readonly dashboardArchivedService: DashboardArchivedService,
  ) {}

  @Get('questions')
  async getAllArchivedQuestions(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedQuestions(query);
  }

  @Get('events')
  async getAllArchivedEvents(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedEvents(query);
  }

  @Get('shares')
  async getAllArchivedShares(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedShares(query);
  }

  @Get('voluntary')
  async getAllArchivedVoluntary(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedVoluntary(query);
  }

  @Get('services')
  async getAllArchivedService(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedService(query);
  }

  @Get('posts')
  async getAllArchivedPosts(@Query() query: DashboardArchivedDto) {
    return this.dashboardArchivedService.getAllArchivedPosts(query);
  }
}
