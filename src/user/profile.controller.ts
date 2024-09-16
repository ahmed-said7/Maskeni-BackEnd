import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto } from './dto/update.password.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { AuthenticationUserGuard } from 'src/common/guards/authentication.user.guard';

@Controller('profile')
export class UserProfileController {
  constructor(private userService: UserService) {}
  @Patch('password')
  @UseGuards(AuthenticationUserGuard)
  updatePassword(@Body() body: UpdatePasswordDto, @Req() req: any) {
    return this.userService.updatepassword(body, req.userId);
  }

  @Delete()
  @UseGuards(AuthenticationUserGuard)
  deleteUser(@Req() req: any) {
    return this.userService.deleteUser(req.userId);
  }

  @Get()
  @UseGuards(AuthenticationUserGuard)
  getUser(@Req() req: any) {
    return this.userService.getUser(req.userId);
  }

  @Patch()
  @UseGuards(AuthenticationUserGuard)
  updateUser(@Req() req: any, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(body, req.userId);
  }
}
