import { z } from 'zod'
import { loginSchema } from './schemas'

export type UserRole = 'advertiser' | 'seeker'

export interface User {
  id: number
  email: string
  password: string
  name: string
  role: UserRole
}

export type LoginInput = z.infer<typeof loginSchema>