import type { User } from '~/models/users'

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'employer@example.com',
    password: 'password123',
    name: 'Employer One',
    role: 'employer',
  },
  {
    id: 2,
    email: 'seeker@example.com',
    password: 'password123',
    name: 'Job Seeker',
    role: 'seeker',
  },
]
