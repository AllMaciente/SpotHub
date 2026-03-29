import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservationDto } from './dto/createReservation.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { reservationConstants } from 'src/common/constants';

@Injectable()
export class ReservationsService {
    constructor(
        private prisma: PrismaService
    ) { }

    async create(dto: CreateReservationDto, userId: bigint) {
        const start = new Date(dto.start)
        const end = new Date(dto.end)

        return this.prisma.$transaction(async (tx) => {
            const conflict = await tx.reservation.findFirst({
                where: {
                    roomId: dto.roomId,
                    status: { not: 'CANCELLED' },
                    AND: [
                        { start: { lt: end } },
                        { end: { gt: start } }
                    ]
                },
                select: { id: true, start: true, end: true }
            })

            if (conflict) {
                throw new ConflictException(`Room is occupied ${conflict.start.toISOString()} to ${conflict.end.toISOString()}`)
            }


            return tx.reservation.create({
                data: { roomId: dto.roomId, end: dto.end, start: dto.start, userId },
                include: { room: true }
            })
        })
    }

    async cancel(id: string, userId: bigint, role: string) {
        const reservation = await this.prisma.reservation.findUniqueOrThrow({ where: { id } })

        const isOwner = reservation.userId === userId
        const isAdmin = ['ADMIN', "GESTOR"].includes(role)

        if (!isOwner && !isAdmin)
            throw new ForbiddenException('you do not have permission to cancel this reservation.');

        const hoursBeforeStart = (reservation.start.getTime() - Date.now()) / 36e5;

        if (!isAdmin && hoursBeforeStart < reservationConstants.CANCELLATION_DEADLINE_HOURS)
            throw new BadRequestException(`Cancellation must be made at ${reservationConstants.CANCELLATION_DEADLINE_HOURS} hour(s) in advance.`);

        return this.prisma.reservation.update({
            where: { id },
            data: { status: 'CANCELLED' }
        })
    }

    findByUser(userId: bigint, query: PaginationDto) {
        return this.prisma.paginate('reservation', query, {
            where: { userId },
            include: { room: true },
            orderBy: { start: 'asc' }
        });
    }

    findByPeriod(roomId?: string, from?: Date, to?: Date) {
        return this.prisma.reservation.findMany({
            where: {
                ...(roomId && { roomId }),
                status: { not: 'CANCELLED' },
                start: { gte: from ?? new Date() },
                ...(to && { fim: { lte: to } }),
            },
            include: { room: true, user: { select: { id: true, name: true } } },
            orderBy: { start: 'asc' },
        });
    }
}
