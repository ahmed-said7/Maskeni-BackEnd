import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { SoftAcceptService } from './soft-accept.service';
import { DashboardUpdateAcceptedDto } from './dto/dashboard.query.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';

@Controller('soft-accept')
export class SoftAcceptController {
  constructor(private readonly softAcceptService: SoftAcceptService) {}

  @Patch('questions/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softAcceptQuestion(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptQuestions(id, updateAcceptedDto);
  }

  @Patch('events/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softAcceptEvent(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptEvents(id, updateAcceptedDto);
  }

  @Patch('shares/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softAcceptShare(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptShares(id, updateAcceptedDto);
  }

  @Patch('voluntary/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softAcceptVoluntary(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptVoluntary(id, updateAcceptedDto);
  }

  @Patch('services/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softAcceptOfferedService(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptService(id, updateAcceptedDto);
  }

  @Patch('posts/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softAcceptPost(
    @Param('id') id: string,
    @Body() updateAcceptedDto: DashboardUpdateAcceptedDto,
  ) {
    return this.softAcceptService.softAcceptPosts(id, updateAcceptedDto);
  }
}
