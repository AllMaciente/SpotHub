import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().describe('User unique identifier'),
  name: z.string().describe('User full name'),
  email: z.string().email().describe('User email address'),
  role: z.string().describe('User role (ADMIN or USER)'),
});

export class UserDto extends createZodDto(UserSchema) {}
