<script setup lang="ts">
import { defineProps, defineEmits, type PropType } from 'vue'
import { jobSchema } from '~/models/job/schemas'
import type { JobFormInput } from '~/models/job/index'
import { useJobStore } from '@/stores/jobs'

const props = defineProps({
  job: {
    type: Object as PropType<JobFormInput>,
    default: () => {},
  },
  showModal: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['onShowModal'])

const isOpen = computed({
  get() {
    return props.showModal
  },
  set(newVal) {
    emit('onShowModal', newVal)
  },
})

const formData = ref<JobFormInput>(jobSchema.parse(props.job))

watch(isOpen, async (newValue) => {
  if (!newValue) {
    formData.value = jobSchema.parse({})
  } else {
    formData.value = jobSchema.parse(props.job)
  }
})

const jobStore = useJobStore()

const handleUpdate = () => {
  jobStore.updateJob(props.job.id, formData.value)
  isOpen.value = false
}
</script>

<template>
  <div>
    <UModal v-model:open="isOpen" title="Edit Job" :ui="{ footer: 'justify-end' }">
      <template #body>
        <UCard>
          <template #header>
            <h2 class="text-lg font-semibold">{{ formData.title }}</h2>
          </template>

          <UForm :state="formData" :schema="jobSchema" @submit="handleUpdate" class="space-y-4">
            <UInput v-model="formData.title" name="title" label="Job Title" />
            <UInput v-model="formData.location" name="location" label="Location" />
            <UTextarea v-model="formData.description" name="description" label="Description" />
          </UForm>
        </UCard>
      </template>

      <template #footer="{ close }">
        <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
        <UButton @click="handleUpdate()">Edit</UButton>
      </template>
    </UModal>
  </div>
</template>
