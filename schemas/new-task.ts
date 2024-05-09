import { z } from 'zod';

export const newTaskFormSchema = z.object({
  title: z.string().min(3).max(30),
  description: z.string().max(1000).optional(),
  priority: z.string(),
  status: z.string().default('open'),
});
