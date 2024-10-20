import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { SoftRemoveService } from './soft-remove.service';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Soft Remove') // Tag for grouping in Swagger UI
@Controller('soft-remove')
export class SoftRemoveController {
  constructor(private readonly softRemoveService: SoftRemoveService) {}

  @Delete('events/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the event to soft remove' })
  @ApiResponse({ description: 'Soft removed the event successfully.' })
  async softRemoveEvent(@Param('id') id: string) {
    return this.softRemoveService.softRemoveEvents(id);
  }

  @Delete('shares/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the share to soft remove' })
  @ApiResponse({ description: 'Soft removed the share successfully.' })
  async softRemoveShare(@Param('id') id: string) {
    return this.softRemoveService.softRemoveShares(id);
  }

  @Delete('voluntary/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({
    name: 'id',
    description: 'ID of the voluntary opportunity to soft remove',
  })
  @ApiResponse({
    description: 'Soft removed the voluntary opportunity successfully.',
  })
  async softRemoveVoluntary(@Param('id') id: string) {
    return this.softRemoveService.softRemoveVoluntary(id);
  }

  @Delete('services/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the service to soft remove' })
  @ApiResponse({ description: 'Soft removed the offered service success.' })
  async softRemoveOfferedService(@Param('id') id: string) {
    return this.softRemoveService.softRemoveService(id);
  }

  @Delete('posts/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the post to soft remove' })
  @ApiResponse({ description: 'Soft removed the post successfully.' })
  async softRemovePost(@Param('id') id: string) {
    return this.softRemoveService.softRemovePosts(id);
  }
  @Delete('groups/:id')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiParam({ name: 'id', description: 'ID of the group to soft remove' })
  @ApiResponse({ description: 'Soft removed the group successfully.' })
  async softRemoveGroups(@Param('id') id: string) {
    return this.softRemoveService.softRemoveGroup(id);
  }
}
