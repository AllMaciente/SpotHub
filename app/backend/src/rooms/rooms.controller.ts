import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
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
import { CreateRoomDto } from './dto/createRooms.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class RoomsController {
  constructor(private rooms: RoomsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'GESTOR')
  @ApiOperation({
    summary: 'Create a new room',
    description: 'Creates a new meeting room. Requires ADMIN or GESTOR role.',
  })
  @ApiResponse({
    status: 201,
    description: 'Room created successfully',
    type: CreateRoomDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - requires ADMIN or GESTOR role',
  })
  async create(@Body() data: CreateRoomDto) {
    return this.rooms.create(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all rooms',
    description:
      'Retrieves a paginated list of all rooms. Filter by active status.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of rooms returned successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  findAll(
    @Query() query: PaginationDto,
    @Query('onlyActive', new DefaultValuePipe(true), ParseBoolPipe)
    onlyActive: boolean,
  ) {
    return this.rooms.findAll(query, onlyActive);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a room by ID',
    description: 'Retrieves a single room by its unique identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Room found successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  @ApiNotFoundResponse({
    description: 'Room not found',
  })
  findOne(@Param('id') id: string) {
    return this.rooms.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'GESTOR')
  @ApiOperation({
    summary: 'Update a room',
    description:
      'Updates an existing meeting room. Requires ADMIN or GESTOR role.',
  })
  @ApiResponse({
    status: 200,
    description: 'Room updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - invalid or missing JWT token',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden - requires ADMIN or GESTOR role',
  })
  @ApiNotFoundResponse({
    description: 'Room not found',
  })
  update(@Param('id') id: string, @Body() data: UpdateRoomDto) {
    return this.rooms.update(id, data);
  }
}
