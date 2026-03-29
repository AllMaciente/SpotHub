import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateRoomDto } from './dto/createRooms.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@UseGuards(AuthGuard)
export class RoomsController {
    constructor(
        private rooms: RoomsService
    ) { }

    @Post()
    @UseGuards(RolesGuard)
    @Roles('ADMIN', 'GESTOR')
    async create(@Body() data: CreateRoomDto) {
        return this.rooms.create(data)
    }

    @Get()
    findAll(@Query('onlyActive', new DefaultValuePipe(true), ParseBoolPipe) onlyActive: boolean) {
        return this.rooms.findAll(onlyActive)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.rooms.findOne(id)
    }

    @Patch(':id')
    @UseGuards(RolesGuard)
    @Roles('ADMIN', 'GESTOR')
    update(@Param('id') id: string, @Body() data: UpdateRoomDto) {
        return this.rooms.update(id, data)
    }

}
