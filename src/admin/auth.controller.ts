import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginAdminDto } from './dto/login.dto';
import { SignupAdminDto } from './dto/signup.dto';
import { AdminService } from './admin.service';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Authentication') // Grouping endpoints under the "Admin Authentication" tag in Swagger UI
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private adminService: AdminService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Admin logged in successfully.' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid credentials.',
  })
  login(@Body() body: LoginAdminDto) {
    return this.adminService.login(body);
  }

  @Post('add-admin')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  @ApiResponse({ status: 201, description: 'Admin created successfully.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only SuperAdmin can add admins.',
  })
  signup(@Body() body: SignupAdminDto) {
    return this.adminService.signup(body);
  }
}
