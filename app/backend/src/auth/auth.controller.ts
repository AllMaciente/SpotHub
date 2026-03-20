import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  async signin(@Body() data: SigninDto) {
    return this.authService.signin(data);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Request() request){
    return request.user
  }
}
