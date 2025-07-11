import { z } from 'zod';

export const jobSchema = z
  .object({
    id: z.number().default(0),
    title: z.string().default(''),
    description: z.string().default(''),
    location: z.string().default(''),
    createdAt: z.string().default(''),
    userId: z.number().default(0),
    tags: z.array(z.string().default('')).default([]),
    salary: z
      .object({
        amount: z.number().default(0),
        currency: z.string().default(''),
      })
      .default({}),
  })
  .default({});
