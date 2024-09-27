import {
  // BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update.user.dto';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@ApiTags('Admin Profile') // Tagging the controller for better organization in Swagger UI
@Controller('admin/profile')
export class AdminProfileController {
  constructor(private adminService: AdminService) {}

  @Patch('password')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Update admin password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async updatePassword(@Body() body: UpdatePasswordDto, @Req() req: any) {
    return await this.adminService.updatepassword(body, req.userId);
  }

  @Delete()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Delete admin profile' })
  @ApiResponse({
    status: 200,
    description: 'Admin profile deleted successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async deleteUser(@Req() req: any) {
    return await this.adminService.deleteUser(req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Get admin profile' })
  @ApiResponse({
    status: 200,
    description: 'Admin profile retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Admin not found' })
  async getUser(@Req() req: any) {
    return await this.adminService.getUser(req.userId);
  }

  @Patch()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  @ApiOperation({ summary: 'Update admin profile' })
  @ApiResponse({
    status: 200,
    description: 'Admin profile updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async updateUser(@Req() req: any, @Body() body: UpdateAdminDto) {
    return await this.adminService.updateUser(body, req.userId);
  }

  @Patch('point/:location')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  @ApiOperation({ summary: 'Update admin address by location' })
  @ApiParam({
    name: 'location',
    required: true,
    description: 'Location coordinates in the format lat:lng',
  })
  @ApiResponse({ status: 200, description: 'Quarter updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid location format' })
  async updateAddress(@Req() req: any, @Param('location') location: string) {
    const [lat, lng] = location.split(':');
    return await this.adminService.updateQuarter(req.userId, req.role, [
      parseFloat(lng),
      parseFloat(lat),
    ]);
  }
}
