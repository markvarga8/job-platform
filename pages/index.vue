<script setup lang="ts">
import { useHead, useRouter } from '#imports'

useHead({ title: "Welcome – Márk's Jobs" })

const router = useRouter()
const navigateTo = (path: string) => router.push(path)
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center text-center p-6">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">Welcome to Márk's Jobs</h1>

    <p class="text-base md:text-lg text-gray-600 max-w-xl mb-6">
      A minimal job posting platform where you can explore open positions or advertise your own.
      Try it as a job seeker or an employer using the demo accounts.
    </p>

    <div class="mt-4">
      <UButton color="primary" size="lg" @click="navigateTo('/login')">
        Get Started
      </UButton>
    </div>
  </div>
</template>
