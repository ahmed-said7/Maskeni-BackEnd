import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login.dto';
import { SignupUserDto } from './dto/signup.dto';
import { changePasswordDto } from './dto/update.password.dto';
import { ForgetPassowrdBody } from './dto/update.user.dto';
import { ValidateObjectIdPipe } from 'src/common/pipe/validate.mongo.pipe';

@Controller('user/auth')
export class UserAuthController {
  constructor(private userService: UserService) {}
  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  }
  @Post('signup')
  signup(@Body() body: SignupUserDto) {
    return this.userService.signup(body);
  }
  @Get('email-code/:userId')
  sendVerificationToEmail(
    @Param('userId', ValidateObjectIdPipe) userId: string,
  ) {
    return this.userService.sendVerification(userId);
  }
  @Patch('email-verify/:code')
  verifyUserEmail(@Param('code') code: string) {
    return this.userService.verifyEmail(code);
  }
  @Patch('forget-pass')
  forgetPassowrd(@Body() body: ForgetPassowrdBody) {
    return this.userService.forgetPassword(body.email);
  }

  @Patch('update-pass')
  changePassword(@Body() body: changePasswordDto) {
    return this.userService.changePassword(body);
  }

  @Patch('verify-pass')
  verifyResetCode(@Param('code') code: string) {
    return this.userService.verifyResetCode(code);
  }
}
