import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { SoftDeleteService } from './soft-delete.service';
import { DashboardUpdateDeletedDto } from './dto/dashboard.query.dto';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Soft Delete') // Tag for grouping in Swagger UI
@Controller('soft-delete')
export class SoftDeleteController {
  constructor(private readonly softDeleteService: SoftDeleteService) {}

  @Patch('questions/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the question to soft delete' }) // Document path parameter
  @ApiBody({ type: DashboardUpdateDeletedDto }) // Document body parameter
  @ApiResponse({
    status: 200,
    description: 'Soft delete the question successfully.',
  }) // Document response
  async softDeleteQuestion(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteQuestions(id, updateDeletedDto);
  }

  @Patch('events/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the event to soft delete' })
  @ApiBody({ type: DashboardUpdateDeletedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft delete the event successfully.',
  })
  async softDeleteEvent(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteEvents(id, updateDeletedDto);
  }

  @Patch('shares/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the share to soft delete' })
  @ApiBody({ type: DashboardUpdateDeletedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft delete the share successfully.',
  })
  async softDeleteShare(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteShares(id, updateDeletedDto);
  }

  @Patch('voluntary/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({
    name: 'id',
    description: 'ID of the voluntary opportunity to soft delete',
  })
  @ApiBody({ type: DashboardUpdateDeletedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft delete the voluntary opportunity successfully.',
  })
  async softDeleteVoluntary(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteVoluntary(id, updateDeletedDto);
  }

  @Patch('services/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the service to soft delete' })
  @ApiBody({ type: DashboardUpdateDeletedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft delete the offered service successfully.',
  })
  async softDeleteOfferedService(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteService(id, updateDeletedDto);
  }

  @Patch('posts/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the post to soft delete' })
  @ApiBody({ type: DashboardUpdateDeletedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft delete the post successfully.',
  })
  async softDeletePost(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeletePosts(id, updateDeletedDto);
  }
}
