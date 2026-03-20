import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const SigninUserSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export class SigninDto extends createZodDto(SigninUserSchema) {}
