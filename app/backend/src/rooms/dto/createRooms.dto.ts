import { createZodDto } from "nestjs-zod";
import z from "zod";

const CreateRoomSchema = z.object({
    name: z.string(),
    capacity: z.int().min(1),
    resources: z.array(z.string()),
    location: z.string().optional()
})

export class CreateRoomDto extends createZodDto(CreateRoomSchema) { }