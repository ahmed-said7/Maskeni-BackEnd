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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { All_Role } from 'src/common/enum';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { Roles } from 'src/common/decorator/roles';

@ApiTags('User Profile') // Grouping the endpoints under a common tag
@Controller('user/profile')
export class UserProfileController {
  constructor(private userService: UserService) {}

  @Delete()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Delete user profile' }) // Summary for the endpoint
  deleteUser(@Req() req: any) {
    return this.userService.deleteUser(req.userId);
  }

  @Get()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Get user profile' }) // Summary for the endpoint
  getUser(@Req() req: any) {
    return this.userService.getUser(req.userId);
  }

  @Patch()
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update user profile' }) // Summary for the endpoint
  updateUser(@Req() req: any, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(body, req.userId);
  }

  @Get('point/:location')
  @UseGuards(AuthenticationGuard, AuthorizationGuard)
  @Roles(All_Role.User)
  @ApiOperation({ summary: 'Update user quarter based on location' }) // Summary for the endpoint
  updateAddress(@Req() req: any, @Param('location') location: string) {
    const [lat, lng] = location.split(':');
    return this.userService.updateQuarter(req.userId, [
      parseInt(lng),
      parseInt(lat),
    ]);
  }
}
