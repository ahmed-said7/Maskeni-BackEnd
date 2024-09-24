import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';
// import { UpdateAddressDto } from 'src/address/dto/update.address.dto';

@Controller('user/profile')
export class UserProfileController {
  constructor(private userService: UserService) {}

  @Delete()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  deleteUser(@Req() req: any) {
    return this.userService.deleteUser(req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  getUser(@Req() req: any) {
    return this.userService.getUser(req.userId);
  }

  @Patch()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateUser(@Req() req: any, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(body, req.userId);
  }
  @Get('point/:location')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  updateAddress(@Req() req: any, @Param('location') location: string) {
    const [lat, lng] = location.split(':');
    return this.userService.updateQuarter(req.userId, [
      parseInt(lng),
      parseInt(lat),
    ]);
  }
}
