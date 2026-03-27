import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { QueryUserDto } from './dto/queryUser.dto';
import { UserDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('get-all')
  @ApiOperation({
    summary: 'Get all users (admin only)',
    description:
      'Retrieves a paginated list of all users. Requires ADMIN role.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users returned successfully',
    type: UserDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  async getAllUser(@Query() query: QueryUserDto) {
    return this.userService.getAll(query);
  }
}
