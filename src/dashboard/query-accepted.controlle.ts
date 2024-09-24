import { Controller, Get, Query } from '@nestjs/common';
import { DashboardAcceptedDto } from './dto/dashboard.query.dto';
import { DashboardAcceptedService } from './query-accepted.service';

@Controller('accepted')
export class DashboardAcceptedController {
  constructor(
    private readonly dashboardAcceptedService: DashboardAcceptedService,
  ) {}

  @Get('questions')
  async getAllAcceptedQuestions(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedQuestions(query);
  }

  @Get('events')
  async getAllAcceptedEvents(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedEvents(query);
  }

  @Get('shares')
  async getAllAcceptedShares(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedShares(query);
  }

  @Get('voluntary')
  async getAllAcceptedVoluntary(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedVoluntary(query);
  }

  @Get('services')
  async getAllAcceptedService(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedService(query);
  }

  @Get('posts')
  async getAllAcceptedPosts(@Query() query: DashboardAcceptedDto) {
    return this.dashboardAcceptedService.getAllAcceptedPosts(query);
  }
}
