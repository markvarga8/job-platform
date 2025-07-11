<script setup lang="ts">
import type { JobFormInput } from '~/models/job/index';

defineProps<{
  job: JobFormInput;
  edit?: boolean;
}>();

defineEmits(['onHandleEdit', 'onHandleDelete']);
</script>

<template>
  <UCard
    class="flex flex-col justify-between h-full cursor-pointer hover:ring-1 hover:ring-primary-500 transition"
    @click="$router.push(`/jobs/${job.id}`)"
  >
    <template #header>
      <div class="flex justify-between items-start">
        <h2 class="text-lg font-semibold break-words">{{ job.title }}</h2>
        <span class="text-sm text-gray-500 whitespace-nowrap">{{ job.location }}</span>
      </div>
    </template>

    <p class="mb-4 text-sm text-gray-700">{{ job.description }}</p>

    <div v-if="job.salary?.amount && job.salary?.currency" class="text-sm text-gray-600 mb-2">
      {{ job.salary.amount.toLocaleString() }} {{ job.salary.currency }}
    </div>

    <template v-if="edit" #footer>
      <div class="flex justify-end gap-2">
        <UButton variant="soft" size="sm" @click.stop="$emit('onHandleEdit', job)">Edit</UButton>
        <UButton variant="soft" size="sm" @click.stop="$emit('onHandleDelete', job.id)"
          >Delete</UButton
        >
      </div>
    </template>
  </UCard>
</template>
