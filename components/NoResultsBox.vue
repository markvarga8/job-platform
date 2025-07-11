<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  notFoundText: string;
}>();
</script>

<template>
  <UCard class="text-center text-gray-600 py-10">
    <UIcon name="i-heroicons-face-frown" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
    <h2 class="text-lg font-semibold">{{ notFoundText }}</h2>
  </UCard>
</template>
