import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const QueryUserSchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10)
    .describe('Maximum number of users to return per page'),
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1)
    .describe('Page number for pagination'),
});

export class QueryUserDto extends createZodDto(QueryUserSchema) {}
