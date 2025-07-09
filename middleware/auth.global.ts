import { useAuthStore } from '~/stores/auth'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const auth = useAuthStore()
    auth.loadUser()

    const publicPages = ['/', '/login']
    const isPublic = publicPages.includes(to.path)

    console.log(isPublic, auth.getUser)

    if (!auth.isLoggedIn && !isPublic) {
      return navigateTo('/login')
    }

    if (isPublic && auth.isLoggedIn) {
      return navigateTo('/dashboard')
    }
  }
})
