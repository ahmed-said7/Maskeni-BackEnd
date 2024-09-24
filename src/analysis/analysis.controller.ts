import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('analysis') // This tag groups the endpoints under "analysis" in the Swagger UI
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('all-docs')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Retrieve all documents for analysis' })
  @ApiResponse({
    status: 200,
    description: 'All documents retrieved successfully.',
  })
  async getAllDocs() {
    return this.analysisService.getAllDocs();
  }

  @Get('users-gender')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Analyze user gender distribution' })
  @ApiResponse({
    status: 200,
    description: 'User gender analysis data retrieved successfully.',
  })
  async analysisUsers() {
    return this.analysisService.analysisUsers();
  }

  @Get('users-by-quarter')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Get users by quarter' })
  @ApiResponse({
    status: 200,
    description: 'User data retrieved successfully based on quarter.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request parameters.' })
  async getUsersByQuarter(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.analysisService.getUsersByQuarter(page, limit);
  }

  @Get('age-statistics')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Get age statistics of users' })
  @ApiResponse({
    status: 200,
    description: 'Age statistics data retrieved successfully.',
  })
  async getAgeStatistics() {
    return this.analysisService.getAgeStatistics();
  }
}
