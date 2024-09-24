import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { SoftRemoveService } from './soft-remove.service';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('soft-remove')
export class SoftRemoveController {
  constructor(private readonly softRemoveService: SoftRemoveService) {}

  @Delete('questions/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softRemoveQuestion(@Param('id') id: string) {
    return this.softRemoveService.softRemoveQuestions(id);
  }

  @Delete('events/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softRemoveEvent(@Param('id') id: string) {
    return this.softRemoveService.softRemoveEvents(id);
  }

  @Delete('shares/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softRemoveShare(@Param('id') id: string) {
    return this.softRemoveService.softRemoveShares(id);
  }

  @Delete('voluntary/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softRemoveVoluntary(@Param('id') id: string) {
    return this.softRemoveService.softRemoveVoluntary(id);
  }

  @Delete('services/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softRemoveOfferedService(@Param('id') id: string) {
    return this.softRemoveService.softRemoveService(id);
  }

  @Delete('posts/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  async softRemovePost(@Param('id') id: string) {
    return this.softRemoveService.softRemovePosts(id);
  }
}
