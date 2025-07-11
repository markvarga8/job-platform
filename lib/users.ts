import type { User } from '~/models/users';

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'employer@example.com',
    password: 'password123',
    username: 'Employer One',
    type: 'employer',
  },
  {
    id: 2,
    email: 'applicant@example.com',
    password: 'password123',
    username: 'Job Seeker',
    type: 'applicant',
  },
];
