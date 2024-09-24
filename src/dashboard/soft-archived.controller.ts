import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { DashboardUpdateArchivedDto } from './dto/dashboard.query.dto';
import { SoftArchiveService } from './soft-archived.service';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('soft-archive')
export class SoftArchiveController {
  constructor(private readonly softArchiveService: SoftArchiveService) {}

  @Patch('questions/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softArchiveQuestion(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveQuestions(id, updateArchivedDto);
  }

  @Patch('events/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softArchiveEvent(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveEvents(id, updateArchivedDto);
  }

  @Patch('shares/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softArchiveShare(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveShares(id, updateArchivedDto);
  }

  @Patch('voluntary/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softArchiveVoluntary(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveVoluntary(id, updateArchivedDto);
  }

  @Patch('services/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softArchiveOfferedService(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchiveService(id, updateArchivedDto);
  }

  @Patch('posts/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softArchivePost(
    @Param('id') id: string,
    @Body() updateArchivedDto: DashboardUpdateArchivedDto,
  ) {
    return this.softArchiveService.softArchivePosts(id, updateArchivedDto);
  }
}
