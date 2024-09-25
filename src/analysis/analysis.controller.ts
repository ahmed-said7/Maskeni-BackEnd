import { Controller, Get, UseGuards } from '@nestjs/common';
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
