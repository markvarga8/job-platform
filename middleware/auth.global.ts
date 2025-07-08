import { useAuth } from '~/composables/useAuth'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const { user } = useAuth()

  const publicPages = ['/', '/login']

  const isPublic = publicPages.includes(to.path)

  // redirect to login
  if (!user.value && !isPublic) {
    return navigateTo('/login')
  }

  // e.g. permission-based redirect (dashboard pages)
  if (to.path.startsWith('/dashboard') && user.value?.role !== 'advertiser') {
    return navigateTo('/login')
  }

  if (to.path.startsWith('/jobs') && user.value?.role !== 'seeker') {
    return navigateTo('/login')
  }

  if (to.path === '/login' && user.value) {
    return navigateTo('/dashboard')
  }
})
