import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const SignupUserSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
});

export class SignupDto extends createZodDto(SignupUserSchema) { }
