import { Body, Controller, Post } from '@nestjs/common';
import { LoginAdminDto } from './dto/login.dto';
import { SignupAdminDto } from './dto/signup.dto';
import { AdminService } from './admin.service';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private adminService: AdminService) {}
  @Post('login')
  login(@Body() body: LoginAdminDto) {
    return this.adminService.login(body);
  }
  @Post('add-admin')
  signup(@Body() body: SignupAdminDto) {
    return this.adminService.signup(body);
  }
}
