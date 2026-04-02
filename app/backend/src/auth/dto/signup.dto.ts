import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const SignupUserSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .describe('User email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .describe('User password (min 8 characters)'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .describe('User full name'),
});

export class SignupDto extends createZodDto(SignupUserSchema) {}
