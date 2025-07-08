import { ref, computed } from 'vue'
import { loginSchema } from '~/models/users/schemas'
import type { LoginInput, User } from '~/models/users'
import { mockUsers } from '~/lib/users'

const AUTH_KEY = 'kibit-auth-user'

const user = ref<User | null>(null)

export function useAuth() {
  const isLoggedIn = computed(() => user.value !== null)

  const loadUser = () => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      user.value = JSON.parse(stored)
    }
  }

  const login = (input: LoginInput): { success: boolean; message?: string } => {
    const parsed = loginSchema.safeParse(input)
    if (!parsed.success) {
      return { success: false, message: 'Invalid input' }
    }

    const found = mockUsers.find(
      (u) =>
        u.email === parsed.data.email &&
        u.password === parsed.data.password
    )

    if (!found) {
      return { success: false, message: 'Invalid credentials' }
    }

    user.value = found
    localStorage.setItem(AUTH_KEY, JSON.stringify(found))
    return { success: true }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem(AUTH_KEY)
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    loadUser,
  }
}
