<template>
  <div class="min-h-screen flex flex-col justify-center items-center text-center p-6" style="height: 100vh;">
    <h1 class="text-4xl font-bold mb-4">Welcome to Márk's Jobs</h1>
    <p class="text-lg text-gray-600 max-w-xl mb-6">
      A minimal job posting platform where you can explore open positions or advertise your own. Try
      it as a job seeker or an employer using the demo accounts.
    </p>

    <div class="mt-4">
      <UButton color="primary" size="lg" @click="navigateTo('/login')"> Get Started </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const navigateTo = useRouter().push
</script>
