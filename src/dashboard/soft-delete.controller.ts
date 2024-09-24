import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { SoftDeleteService } from './soft-delete.service';
import { DashboardUpdateDeletedDto } from './dto/dashboard.query.dto';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('soft-delete')
export class SoftDeleteController {
  constructor(private readonly softDeleteService: SoftDeleteService) {}

  @Patch('questions/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softDeleteQuestion(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteQuestions(id, updateDeletedDto);
  }

  @Patch('events/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softDeleteEvent(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteEvents(id, updateDeletedDto);
  }

  @Patch('shares/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softDeleteShare(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteShares(id, updateDeletedDto);
  }

  @Patch('voluntary/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softDeleteVoluntary(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteVoluntary(id, updateDeletedDto);
  }

  @Patch('services/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softDeleteOfferedService(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeleteService(id, updateDeletedDto);
  }

  @Patch('posts/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softDeletePost(
    @Param('id') id: string,
    @Body() updateDeletedDto: DashboardUpdateDeletedDto,
  ) {
    return this.softDeleteService.softDeletePosts(id, updateDeletedDto);
  }
}
