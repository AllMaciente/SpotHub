import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const SigninUserSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .toLowerCase()
    .describe('User email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .describe('User password'),
});

export class SigninDto extends createZodDto(SigninUserSchema) {}
