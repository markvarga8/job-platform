import { z } from 'zod';
import { loginSchema } from './schemas';

export type UserRole = 'employer' | 'applicant';

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
  type: UserRole;
  appliedJobIds?: number[];
}

export type LoginInput = z.infer<typeof loginSchema>;
