import { z } from 'zod'
import { jobSchema } from './schemas'

export type JobFormInput = z.infer<typeof jobSchema>