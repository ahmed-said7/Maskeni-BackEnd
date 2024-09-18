import { Body, Controller, Delete, Get, Patch, Req } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update.user.dto';

@Controller('admin/profile')
export class AdminProfileController {
  constructor(private adminService: AdminService) {}
  @Patch('password')
  updatePassword(@Body() body: UpdatePasswordDto, @Req() req: any) {
    return this.adminService.updatepassword(body, req.userId);
  }

  @Delete()
  deleteUser(@Req() req: any) {
    return this.adminService.deleteUser(req.userId);
  }

  @Get()
  getUser(@Req() req: any) {
    return this.adminService.getUser(req.userId);
  }

  @Patch()
  updateUser(@Req() req: any, @Body() body: UpdateAdminDto) {
    return this.adminService.updateUser(body, req.userId);
  }
}
