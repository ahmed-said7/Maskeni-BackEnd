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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Control') // Grouping endpoints under the "Admin Control" tag in Swagger UI
@Controller('admin/control')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  @ApiResponse({
    status: 200,
    description: 'Retrieved all admins successfully.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only SuperAdmin can access.',
  })
  getAdmins(@Query() query: FindQuery) {
    return this.adminService.getAllAdmins(query);
  }

  @Delete(':adminId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  @ApiResponse({ status: 200, description: 'Admin deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only SuperAdmin can delete admins.',
  })
  deleteAdmin(@Param('adminId', ValidateObjectIdPipe) adminId: string) {
    return this.adminService.deleteUser(adminId);
  }

  @Get(':adminId')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.SuperAdmin)
  @ApiResponse({
    status: 200,
    description: 'Retrieved admin details successfully.',
  })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only SuperAdmin can access.',
  })
  getAdmin(@Param('adminId', ValidateObjectIdPipe) adminId: string) {
    return this.adminService.getUser(adminId);
  }
}
