<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { loginSchema } from '~/models/users/schemas'
import type { LoginInput } from '~/models/users/index'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login, isLoggedIn } = useAuth()

useHead({ title: 'Login' })

const formData = ref<LoginInput>(loginSchema.parse({}))
const error = ref<string | null>(null)

const handleLogin = () => {
  error.value = null

  const { success, message } = login(formData.value)

  if (!success) {
    error.value = message ?? 'Login failed'
    return
  }

  router.push('/dashboard')
}
</script>

<template>
  <div class="max-w-md mx-auto mt-12">
    <UCard>
      <template #header>
        <h2 class="text-xl font-bold">Login</h2>
      </template>

      <UForm :state="formData" :schema="loginSchema" @submit="handleLogin" class="space-y-4">
        <UInput
          v-model="formData.email"
          name="email"
          type="email"
          placeholder="you@example.com"
          label="Email"
        />
        <UInput
          v-model="formData.password"
          name="password"
          type="password"
          placeholder="********"
          label="Password"
        />

        <UButton type="submit" block>Login</UButton>

        <UAlert
          v-if="error"
          variant="subtle"
          icon="i-heroicons-exclamation-triangle"
          class="mt-2"
          :title="error"
        />
      </UForm>
    </UCard>
  </div>
</template>
