import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('admin/control')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  getAdmins(@Query() query: FindQuery) {
    return this.adminService.getAllAdmins(query);
  }
  @Delete(':adminId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  deleteAdmin(@Param('adminId', ValidateObjectIdPipe) adminId: string) {
    return this.adminService.deleteUser(adminId);
  }

  @Get(':adminId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  getAdmin(@Param('adminId', ValidateObjectIdPipe) adminId: string) {
    return this.adminService.getUser(adminId);
  }
}
