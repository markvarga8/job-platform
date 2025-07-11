<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();

onMounted(() => auth.loadUser());
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
