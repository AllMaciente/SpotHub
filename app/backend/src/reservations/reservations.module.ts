import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ReservationsService, PrismaService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
