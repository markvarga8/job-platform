<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { loadUser } = useAuth()

onMounted(() => loadUser())
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
