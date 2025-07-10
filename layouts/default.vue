<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRouter, useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const logout = () => {
  auth.logout()
  router.push('/login')
}

const isEmployer = computed(() => auth.user?.role === 'employer')
const isLoggedIn = computed(() => auth.isLoggedIn)

const showLogout = computed(() => {
  return isLoggedIn.value && !['/', '/login'].includes(route.path)
})

const isActive = (path: string) => route.path === path
</script>

<template>
  <div>
    <header class="flex justify-between items-center px-6 py-4 border-b">
      <h1 class="text-xl font-semibold cursor-pointer text-primary" @click="router.push('/')">
        Kibit Job Platform
      </h1>

      <nav class="flex items-center gap-3">
        <UButton
          v-if="isEmployer && !isActive('/dashboard')"
          variant="link"
          color="primary"
          @click="router.push('/dashboard')"
        >
          Dashboard
        </UButton>

        <UButton
          v-if="!isActive('/jobs')"
          variant="link"
          color="primary"
          @click="router.push('/jobs')"
        >
          Jobs
        </UButton>

        <UButton
          v-if="showLogout"
          icon="i-heroicons-arrow-left-on-rectangle"
          color="red"
          variant="outline"
          size="sm"
          @click="logout"
        >
          Logout
        </UButton>
      </nav>
    </header>

    <!-- MAIN CONTENT -->
    <main class="p-4">
      <slot />
    </main>
  </div>
</template>
