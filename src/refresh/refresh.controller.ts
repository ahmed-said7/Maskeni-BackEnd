import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticationAdminGuard } from 'src/common/guards/authentication.admin.guard';
import { AuthenticationUserGuard } from 'src/common/guards/authentication.user.guard';

@Controller('refresh')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Get('admin')
  @UseGuards(AuthenticationAdminGuard)
  RefreshAdmin(@Req() req: any) {
    return this.AuthService.createAdminTokens(req.userId, req.role);
  }
  @Get('user')
  @UseGuards(AuthenticationUserGuard)
  RefreshUser(@Req() req: any) {
    return this.AuthService.createUserTokens(req.userId, req.role);
  }
}
