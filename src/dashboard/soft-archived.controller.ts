import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { DashboardUpdateArchivedDto } from './dto/dashboard.query.dto';
import { SoftArchiveService } from './soft-archived.service';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Soft Archive') // Tag for grouping in Swagger UI
@Controller('soft-archive')
export class SoftArchiveController {
  constructor(private readonly softArchiveService: SoftArchiveService) {}

  @Patch('events/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the event to soft archive' })
  @ApiBody({ type: DashboardUpdateArchivedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft archive the event successfully.',
  })
  async softArchiveEvent(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveEvents(id, updateArchivedDto);
  }

  @Patch('feed/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the feed to soft archive' })
  @ApiBody({ type: DashboardUpdateArchivedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft archive the feed successfully.',
  })
  async softArchiveFeed(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveFeed(id, updateArchivedDto);
  }

  @Patch('voluntary/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({
    name: 'id',
    description: 'ID of the voluntary opportunity to soft archive',
  })
  @ApiBody({ type: DashboardUpdateArchivedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft archive the voluntary opportunity successfully.',
  })
  async softArchiveVoluntary(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveVoluntary(id, updateArchivedDto);
  }

  @Patch('services/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the service to soft archive' })
  @ApiBody({ type: DashboardUpdateArchivedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft archive the offered service successfully.',
  })
  async softArchiveOfferedService(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveService(id, updateArchivedDto);
  }

  @Patch('posts/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the post to soft archive' })
  @ApiBody({ type: DashboardUpdateArchivedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft archive the post successfully.',
  })
  async softArchivePost(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchivePosts(id, updateArchivedDto);
  }
  @Patch('groups/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the group to soft archive' })
  @ApiBody({ type: DashboardUpdateArchivedDto })
  @ApiResponse({
    status: 200,
    description: 'Soft archive the group successfully.',
  })
  async softArchiveGroup(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveGroups(id, updateArchivedDto);
  }
}
