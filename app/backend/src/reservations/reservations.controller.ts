import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

interface AuthRequest {
  user: { id: bigint; role: string };
}

@Controller('reservations')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ReservationsController {
  constructor(private reservations: ReservationsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new reservation',
    description: 'Creates a new room reservation for the authenticated user',
  })
  @ApiResponse({
    status: 201,
    description: 'Reservation created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data or room already occupied',
  })
  create(@Body() data: CreateReservationDto, @Req() request: AuthRequest) {
    const userId = request.user.id;
    return this.reservations.create(data, userId);
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get my reservations',
    description: 'Returns all reservations made by the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User reservations retrieved successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  findByUser(@Req() request: AuthRequest, @Query() query: PaginationDto) {
    const userId = request.user.id;
    return this.reservations.findByUser(userId, query);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'GESTOR')
  @ApiOperation({
    summary: 'Get all reservations (admin/manager)',
    description:
      'Returns all reservations with optional filters by room and date range',
  })
  @ApiResponse({
    status: 200,
    description: 'Reservations retrieved successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - requires ADMIN or GESTOR role',
  })
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

  @Delete(':id')
  @ApiOperation({
    summary: 'Cancel a reservation',
    description: 'Cancels an existing reservation. Owner or admin can cancel.',
  })
  @ApiResponse({
    status: 200,
    description: 'Reservation cancelled successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - only owner or admin can cancel',
  })
  @ApiNotFoundResponse({
    description: 'Reservation not found',
  })
  @ApiBadRequestResponse({
    description: 'Cancellation deadline passed',
  })
  cancel(@Param('id') id: string, @Req() request: AuthRequest) {
    const { id: requesterId, role } = request.user;
    return this.reservations.cancel(id, requesterId, role);
  }
}
