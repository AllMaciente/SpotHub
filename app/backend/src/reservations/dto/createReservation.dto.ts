import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateReservationSchema = z
  .object({
    roomId: z.string().uuid().describe('Room unique identifier (UUID)'),
    start: z
      .string()
      .datetime()
      .describe('Reservation start time (ISO 8601 datetime)'),
    end: z
      .string()
      .datetime()
      .describe('Reservation end time (ISO 8601 datetime)'),
  })
  .refine((data) => new Date(data.end) > new Date(data.start), {
    message: 'the end date must be after the start date',
    path: ['end'],
  })
  .refine((data) => new Date(data.start) >= new Date(), {
    message: 'reservation date cannot be in the past',
    path: ['start'],
  });

export class CreateReservationDto extends createZodDto(
  CreateReservationSchema,
) {}
