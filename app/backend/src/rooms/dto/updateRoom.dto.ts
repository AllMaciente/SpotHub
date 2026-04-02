import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const UpdateRoomSchema = z.object({
  name: z.string().optional().describe('Room name'),
  capacity: z.int().min(1).optional().describe('Room capacity (minimum 1)'),
  resources: z
    .array(z.string())
    .optional()
    .describe('List of room resources (e.g., TV, Projector)'),
  location: z.string().optional().describe('Room location (e.g., Floor 2)'),
  active: z.boolean().optional().describe('Whether the room is active'),
});

export class UpdateRoomDto extends createZodDto(UpdateRoomSchema) {}
