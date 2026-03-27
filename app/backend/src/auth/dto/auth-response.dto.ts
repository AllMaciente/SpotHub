import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const ROLES = ["USER", "ADMIN", "GESTOR"]

export const SignupResponseSchema = z.object({
  id: z.string().describe('User unique identifier'),
  name: z.string().describe('User full name'),
  email: z.string().email().describe('User email address'),
  role: z.enum(ROLES)
});

export class SignupResponseDto extends createZodDto(SignupResponseSchema) { }

export const SigninResponseSchema = z.object({
  accessToken: z
    .string()
    .describe('JWT access token for authenticated requests'),
});

export class SigninResponseDto extends createZodDto(SigninResponseSchema) { }
