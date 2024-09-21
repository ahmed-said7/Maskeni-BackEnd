import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login.dto';

@Controller('user/auth/')
export class UserAuthController {
  constructor(private userService: UserService) {}
  @Post('login')
  loginUsingMobile(@Body() body: LoginUserDto) {
    return this.userService.signup(body);
  }
  @Post('firebase')
  loginFirebase(@Req() req: any) {
    return this.userService.register(req);
  }
  @Get('code/:code')
  verifyCode(@Param('code') code: string) {
    return this.userService.verifyPhone(code);
  }
  @Post('guest')
  loginAsGuest() {
    return this.userService.createGuest();
  }
}
