import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
    constructor(
        private reservationsService: ReservationsService
    ) { }

    @Get('my-reservations')
    findByUser(@Req() request, @Query() query: PaginationDto) {
        const userId = request.user.id;
        return this.reservationsService.findByUser(userId, query);
    }
}
