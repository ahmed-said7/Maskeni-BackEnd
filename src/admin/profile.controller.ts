import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { AdminService } from './admin.service';
import { AuthenticationAdminGuard } from 'src/common/guards/authentication.admin.guard';
import { UpdateAdminDto } from './dto/update.user.dto';

@Controller('admin/profile')
export class AdminProfileController {
  constructor(private adminService: AdminService) {}
  @Patch('password')
  @UseGuards(AuthenticationAdminGuard)
  updatePassword(@Body() body: UpdatePasswordDto, @Req() req: any) {
    return this.adminService.updatepassword(body, req.userId);
  }

  @Delete()
  @UseGuards(AuthenticationAdminGuard)
  deleteUser(@Req() req: any) {
    return this.adminService.deleteUser(req.userId);
  }

  @Get()
  @UseGuards(AuthenticationAdminGuard)
  getUser(@Req() req: any) {
    return this.adminService.getUser(req.userId);
  }

  @Patch()
  @UseGuards(AuthenticationAdminGuard)
  updateUser(@Req() req: any, @Body() body: UpdateAdminDto) {
    return this.adminService.updateUser(body, req.userId);
  }
}
