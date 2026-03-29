import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateReservationSchema = z.object({
    roomId: z.string().uuid(),
    start: z.coerce.date(), // ou z.string().datetime()
    end: z.coerce.date(),
}).refine((data) => data.end > data.start, {
    message: "the end date must be after the start date",
    path: ["end"],
});

export class CreateReservationDto extends createZodDto(CreateReservationSchema) { }