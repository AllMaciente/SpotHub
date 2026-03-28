import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { Role } from "src/generated/prisma/enums";

const UpdateUserSchema = z.object({
    userId: z.number().optional().describe('ID do usuário a ser atualizado (opcional, usa o próprio usuário se não informado)'),
    email: z.email('Invalid email address').toLowerCase().optional(),
    name: z.string().optional(),
    role: z.nativeEnum(Role).optional()
})

export class UpdateUserDto extends createZodDto(UpdateUserSchema) { }