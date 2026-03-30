import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserDto } from './dto/user-response.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';

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
  async getAllUser(@Query() query: PaginationDto) {
    return this.userService.getAll(query);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  @ApiOperation({
    summary: 'Update user profile',
    description:
      'Updates user profile. ADMIN can update any user; non-admin can only update their own profile. Only ADMIN can change roles.',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiForbiddenResponse({
    description:
      'Forbidden - you can only update your own profile, or only ADMIN can change roles',
  })
  async updateUser(@Body() data: UpdateUserDto, @Req() request) {
    return this.userService.updateUser(data, request);
  }
}
