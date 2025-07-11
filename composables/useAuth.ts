import { loginSchema } from '~/models/users/schemas';
import type { LoginInput } from '~/models/users';
import { mockUsers } from '~/lib/users';
import { useAuthStore } from '~/stores/auth';

export const useAuth = () => {
  const auth = useAuthStore();

  const login = (input: LoginInput): { success: boolean; message?: string } => {
    const parsed = loginSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, message: 'Invalid input' };
    }

    const user = mockUsers.find(
      (u) => u.email === parsed.data.email && u.password === parsed.data.password
    );

    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    auth.setUser(user);
    return { success: true };
  };

  return { login };
};
