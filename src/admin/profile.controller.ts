import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update.user.dto';
import { All_Role } from 'src/common/enum';
import { Roles } from 'src/common/decorator/roles';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('admin/profile')
export class AdminProfileController {
  constructor(private adminService: AdminService) {}
  @Patch('password')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  updatePassword(@Body() body: UpdatePasswordDto, @Req() req: any) {
    return this.adminService.updatepassword(body, req.userId);
  }

  @Delete()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  deleteUser(@Req() req: any) {
    return this.adminService.deleteUser(req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  getUser(@Req() req: any) {
    return this.adminService.getUser(req.userId);
  }

  @Patch()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin, All_Role.Admin)
  updateUser(@Req() req: any, @Body() body: UpdateAdminDto) {
    return this.adminService.updateUser(body, req.userId);
  }
  @Get('point/:location')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateAddress(@Req() req: any, @Param('location') location: string) {
    const [lat, lng] = location.split(':');
    return this.adminService.updateQuarter(req.userId, req.role, [
      parseInt(lng),
      parseInt(lat),
    ]);
  }
}
