import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
    constructor(
        private reservations: ReservationsService
    ) { }

    @Post()
    create(@Body() data: CreateReservationDto, @Req() request) {
        const userId = request.user.id;
        return this.reservations.create(data, userId)
    }

    @Get('me')
    findByUser(@Req() request, @Query() query: PaginationDto) {
        const userId = request.user.id;
        return this.reservations.findByUser(userId, query);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles('ADMIN', 'GESTOR')
    findAll(
        @Query() query: PaginationDto,
        @Query('roomId') roomId?: string,
        @Query('from') from?: string,
        @Query('to') to?: string,
    ) {
        return this.reservations.findByPeriod(
            query,
            roomId,
            from ? new Date(from) : undefined,
            to ? new Date(to) : undefined,
        );
    }

    @Delete(":id")
    cancel(@Param('id') id: string, @Req() request) {
        const { id: requesterId, role } = request.user
        return this.reservations.cancel(id, requesterId, role)
    }
}
