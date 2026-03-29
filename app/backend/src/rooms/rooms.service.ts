import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateRoomDto } from './dto/createRooms.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';

@Injectable()
export class RoomsService {
    constructor(
        private prisma: PrismaService
    ) { }

    create(data: CreateRoomDto) {
        return this.prisma.room.create({ data })
    }

    findAll(query: PaginationDto, onlyActive: boolean) {
        const where = onlyActive ? { active: true } : {};
        return this.prisma.paginate('room', query, { where });
    }

    findOne(id: string) {
        return this.prisma.room.findFirstOrThrow({ where: { id } })
    }

    update(id: string, data: UpdateRoomDto) {
        return this.prisma.room.update({ where: { id }, data })
    }
}
