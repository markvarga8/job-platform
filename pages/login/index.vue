<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHead } from '#imports';

import { useAuth } from '~/composables/useAuth';
import { useAuthStore } from '~/stores/auth';
import { loginSchema } from '~/models/users/schemas';
import type { LoginInput } from '~/models/users/index';

useHead({ title: 'Login' });

const router = useRouter();
const auth = useAuthStore();
const { login } = useAuth();

const formData = ref<LoginInput>(loginSchema.parse({}));
const error = ref<string | null>(null);
const isLoading = ref(false);

const handleLogin = async () => {
  error.value = null;
  isLoading.value = true;

  const { success, message } = await login(formData.value);

  isLoading.value = false;

  if (!success) {
    error.value = message ?? 'Login failed';
    return;
  }

  const redirectTo = auth.getUser?.type === 'employer' ? '/dashboard' : '/jobs';
  router.push(redirectTo);
};

const loginAs = (role: 'employer' | 'applicant') => {
  formData.value.email = `${role}@example.com`;
  formData.value.password = 'password123';
};
</script>

<template>
  <div class="max-w-md mx-auto px-4 mt-12">
    <UCard>
      <template #header>
        <h2 class="text-xl font-bold">Login</h2>
        <p class="text-sm text-gray-500 mt-2">Use one of the demo accounts:</p>
        <div class="flex flex-wrap gap-2 mt-2">
          <UTooltip text="Login as employer to post and manage job ads">
            <UButton size="xs" color="primary" @click="loginAs('employer')">
              Login as Employer
            </UButton>
          </UTooltip>

          <UTooltip text="Login as job applicant to browse and apply">
            <UButton size="xs" color="primary" @click="loginAs('applicant')">
              Login as Applicant
            </UButton>
          </UTooltip>
        </div>
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

        <UButton type="submit" block :loading="isLoading">Login</UButton>

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
