import { Controller, Get, Query } from '@nestjs/common';
import { DashboardDeletedDto } from './dto/dashboard.query.dto';
import { DashboardDeletedService } from './query-deleted.service';

@Controller('soft-deleted')
export class DashboardDeletedController {
  constructor(
    private readonly dashboardDeletedService: DashboardDeletedService,
  ) {}

  @Get('questions')
  async getAllDeletedQuestions(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedQuestions(query);
  }

  @Get('events')
  async getAllDeletedEvents(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedEvents(query);
  }

  @Get('shares')
  async getAllDeletedShares(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedShares(query);
  }

  @Get('voluntary')
  async getAllDeletedVoluntary(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedVoluntary(query);
  }

  @Get('services')
  async getAllDeletedService(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedService(query);
  }

  @Get('posts')
  async getAllDeletedPosts(@Query() query: DashboardDeletedDto) {
    return this.dashboardDeletedService.getAllDeletedPosts(query);
  }
}
