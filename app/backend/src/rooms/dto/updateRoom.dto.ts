import { createZodDto } from "nestjs-zod";
import z from "zod";

const UpdateRoomSchema = z.object({
    name: z.string().optional(),
    capacity: z.int().min(1).optional(),
    resources: z.array(z.string()).optional(),
    location: z.string().optional(),
    active: z.boolean().optional()
})

export class UpdateRoomDto extends createZodDto(UpdateRoomSchema) { }