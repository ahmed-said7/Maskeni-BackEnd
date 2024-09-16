import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthenticationAdminGuard } from 'src/common/guards/authentication.admin.guard';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';

@Controller('admin/control')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get()
  @UseGuards(AuthenticationAdminGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  getAdmins(@Query() query: FindQuery) {
    return this.adminService.getAllAdmins(query);
  }
  @Delete(':adminId')
  @UseGuards(AuthenticationAdminGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  deleteAdmin(@Param('adminId', ValidateObjectIdPipe) adminId: string) {
    return this.adminService.deleteUser(adminId);
  }

  @Get(':adminId')
  @UseGuards(AuthenticationAdminGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  getAdmin(@Param('adminId', ValidateObjectIdPipe) adminId: string) {
    return this.adminService.getUser(adminId);
  }
}
