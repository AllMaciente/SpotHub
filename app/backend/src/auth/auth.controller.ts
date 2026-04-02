import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { SignupResponseDto, SigninResponseDto } from './dto/auth-response.dto';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

interface AuthRequest {
  user: { id: bigint; role: string; email: string };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user account and returns user details without password',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: SignupResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  @ApiOperation({
    summary: 'Authenticate user',
    description: 'Validates user credentials and returns a JWT access token',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    type: SigninResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password',
  })
  async signin(@Body() data: SigninDto) {
    return this.authService.signin(data);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({
    summary: 'Get current user',
    description: 'Returns the currently authenticated user based on JWT token',
  })
  @ApiResponse({
    status: 200,
    description: 'Current user information',
    type: SignupResponseDto,
  })
  me(@Request() request: AuthRequest) {
    return request.user;
  }
}
