import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const CreateRoomSchema = z.object({
  name: z.string().describe('Room name'),
  capacity: z.int().min(1).describe('Room capacity (minimum 1)'),
  resources: z
    .array(z.string())
    .describe('List of room resources (e.g., TV, Projector)'),
  location: z.string().optional().describe('Room location (e.g., Floor 2)'),
});

export class CreateRoomDto extends createZodDto(CreateRoomSchema) {}
