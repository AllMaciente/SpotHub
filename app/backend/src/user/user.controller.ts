import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { QueryUserDto } from './dto/queryUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('ADMIN')
    @Get('get-all')
    async getAllUser(@Query() query: QueryUserDto) {
        return this.userService.getAll(query)
    }
}
