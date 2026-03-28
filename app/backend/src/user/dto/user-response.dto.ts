import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { Role } from 'src/generated/prisma/enums';

export const UserSchema = z.object({
  id: z.string().describe('User unique identifier'),
  name: z.string().describe('User full name'),
  email: z.string().email().describe('User email address'),
  role: z.nativeEnum(Role).describe('User role (ADMIN, GESTOR, or USER)'),
});

export class UserDto extends createZodDto(UserSchema) {}
