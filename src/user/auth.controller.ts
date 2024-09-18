import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';

@Controller('user/auth')
export class UserAuthController {
  constructor(private userService: UserService) {}
  @Post('login')
  loginUsingMobile(@Body() body: LoginUserDto) {
    return this.userService.signup(body);
  }
  @Post('signup')
  loginFirebase(@Req() req: any) {
    return this.userService.register(req);
  }
  @Get('code/:code')
  verifyCode(@Param('code', ValidateObjectIdPipe) code: string) {
    return this.userService.verifyPhone(code);
  }
  @Patch('guest')
  verifyUserEmail() {
    return this.userService.createGuest();
  }
}
