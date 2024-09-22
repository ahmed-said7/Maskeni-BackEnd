import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginAdminDto } from './dto/login.dto';
import { SignupAdminDto } from './dto/signup.dto';
import { AdminService } from './admin.service';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private adminService: AdminService) {}
  @Post('login')
  login(@Body() body: LoginAdminDto) {
    return this.adminService.login(body);
  }
  @Post('add-admin')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  signup(@Body() body: SignupAdminDto) {
    return this.adminService.signup(body);
  }
}
