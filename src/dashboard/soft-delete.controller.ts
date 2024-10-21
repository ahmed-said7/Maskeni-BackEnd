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

  @Patch('feed/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the feed to soft delete' })
  @ApiBody({ type: DashboardUpdateDeletedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft delete the feed successfully.',
  })
  async softDeleteFeed(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteFeed(id, updateDeletedDto);
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
  @Patch('groups/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the group to soft delete' })
  @ApiBody({ type: DashboardUpdateDeletedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft delete the group successfully.',
  })
  async softDeleteGroup(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteGroups(id, updateDeletedDto);
  }
}
