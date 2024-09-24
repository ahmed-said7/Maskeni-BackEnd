import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('all-docs')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAllDocs() {
    return this.analysisService.getAllDocs();
  }

  @Get('users-gender')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async analysisUsers() {
    return this.analysisService.analysisUsers();
  }

  @Get('users-by-quarter')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getUsersByQuarter(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.analysisService.getUsersByQuarter(page, limit);
  }

  @Get('age-statistics')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async getAgeStatistics() {
    return this.analysisService.getAgeStatistics();
  }
}
