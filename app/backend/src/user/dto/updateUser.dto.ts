import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { Role } from "src/generated/prisma/enums";

const UpdateUserSchema = z.object({
    userId: z.number().optional().describe('User ID to update (optional, uses authenticated user if not provided)'),
    email: z.email('Invalid email address').toLowerCase().optional().describe('User email address'),
    name: z.string().optional().describe('User full name'),
    role: z.nativeEnum(Role).optional().describe('User role (ADMIN, GESTOR, or USER)')
})

export class UpdateUserDto extends createZodDto(UpdateUserSchema) { }