import { Controller, Get, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('all-docs')
  async getAllDocs() {
    return this.analysisService.getAllDocs();
  }

  @Get('users-gender')
  async analysisUsers() {
    return this.analysisService.analysisUsers();
  }

  @Get('users-by-quarter')
  async getUsersByQuarter(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.analysisService.getUsersByQuarter(page, limit);
  }

  @Get('age-statistics')
  async getAgeStatistics() {
    return this.analysisService.getAgeStatistics();
  }
}
