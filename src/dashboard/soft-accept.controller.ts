import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { SoftAcceptService } from './soft-accept.service';
import { DashboardUpdateAcceptedDto } from './dto/dashboard.query.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Soft Accept') // Tag for grouping in Swagger UI
@Controller('soft-accept')
export class SoftAcceptController {
  constructor(private readonly softAcceptService: SoftAcceptService) {}

  @Patch('questions/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the question to soft accept' }) // Document path parameter
  @ApiBody({ type: DashboardUpdateAcceptedDto }) // Document body parameter
  @ApiResponse({
    status: 200,
    description: 'Soft accept the question successfully.',
  }) // Document response
  async softAcceptQuestion(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptQuestions(id, updateAcceptedDto);
  }

  @Patch('events/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the event to soft accept' })
  @ApiBody({ type: DashboardUpdateAcceptedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft accept the event successfully.',
  })
  async softAcceptEvent(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptEvents(id, updateAcceptedDto);
  }

  @Patch('shares/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the share to soft accept' })
  @ApiBody({ type: DashboardUpdateAcceptedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft accept the share successfully.',
  })
  async softAcceptShare(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptShares(id, updateAcceptedDto);
  }

  @Patch('voluntary/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({
    name: 'id',
    description: 'ID of the voluntary opportunity to soft accept',
  })
  @ApiBody({ type: DashboardUpdateAcceptedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft accept the voluntary opportunity successfully.',
  })
  async softAcceptVoluntary(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptVoluntary(id, updateAcceptedDto);
  }

  @Patch('services/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the service to soft accept' })
  @ApiBody({ type: DashboardUpdateAcceptedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft accept the offered service successfully.',
  })
  async softAcceptOfferedService(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptService(id, updateAcceptedDto);
  }

  @Patch('posts/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the post to soft accept' })
  @ApiBody({ type: DashboardUpdateAcceptedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft accept the post successfully.',
  })
  async softAcceptPost(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptPosts(id, updateAcceptedDto);
  }
}
