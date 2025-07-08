import { z } from 'zod'

export const jobSchema = z.object({
  id: z.number().default(0),
  title: z.string().default(''),
  description: z.string().default(''),
  location: z.string().default(''),
  createdAt: z.string().default(''),
  userId: z.number().default(0),
}).default({})
