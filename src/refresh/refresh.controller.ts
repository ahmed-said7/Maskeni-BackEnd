import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('refresh')
export class RefreshController {
  constructor(private AuthService: RefreshService) {}
  @Get('admin')
  @UseGuards(RefreshGuard, AuthorizationGuard)
  @Roles(All_Role.Admin, All_Role.SuperAdmin)
  RefreshAdmin(@Req() req: any) {
    return this.AuthService.createAdminTokens(req.userId, req.role);
  }
  @Get('user')
  @UseGuards(RefreshGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  RefreshUser(@Req() req: any) {
    return this.AuthService.createUserTokens(req.userId, req.role);
  }
}
