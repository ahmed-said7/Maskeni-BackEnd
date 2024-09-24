import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login.dto';

@ApiTags('User Authentication') // Grouping the endpoints under a common tag
@Controller('user/auth/')
export class UserAuthController {
  constructor(private userService: UserService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login using mobile number' }) // Summary for the endpoint
  loginUsingMobile(@Body() body: LoginUserDto) {
    return this.userService.signup(body);
  }

  @Post('firebase')
  @ApiOperation({ summary: 'Login using Firebase authentication' })
  loginFirebase(@Req() req: any) {
    return this.userService.register(req);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Verify phone code for authentication' })
  verifyCode(@Param('code') code: string) {
    return this.userService.verifyPhone(code);
  }

  @Post('guest')
  @ApiOperation({ summary: 'Login as a guest user' })
  loginAsGuest() {
    return this.userService.createGuest();
  }
}
