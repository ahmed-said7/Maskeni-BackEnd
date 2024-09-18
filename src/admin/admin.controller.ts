import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from 'src/common/decorator/roles';
import { All_Role } from 'src/common/enum';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';
import { FindQuery } from 'src/common/types';

@Controller('admin/control')
export class AdminController {
  constructor(private adminService: AdminService) {}
  @Get()
  @Roles(All_Role.SuperAdmin)
  getAdmins(@Query() query: FindQuery) {
    return this.adminService.getAllAdmins(query);
  }
  @Delete(':adminId')
  deleteAdmin(@Param('adminId', ValidateObjectIdPipe) adminId: string) {
    return this.adminService.deleteUser(adminId);
  }

  @Get(':adminId')
  getAdmin(@Param('adminId', ValidateObjectIdPipe) adminId: string) {
    return this.adminService.getUser(adminId);
  }
}
