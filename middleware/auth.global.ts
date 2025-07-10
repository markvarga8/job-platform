import { useAuthStore } from '~/stores/auth'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) return

  const auth = useAuthStore()
  auth.loadUser()

  const publicPages = ['/', '/login']
  const isPublic = publicPages.includes(to.path)

  const isSeekerAllowedPage = to.path.startsWith('/jobs') || to.path.startsWith('/apply')

  if (!auth.isLoggedIn && !isPublic) {
    return navigateTo('/login')
  }

  if (auth.isLoggedIn && auth.user?.role === 'seeker' && !isSeekerAllowedPage) {
    return navigateTo('/jobs')
  }
})
