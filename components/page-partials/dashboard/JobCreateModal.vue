<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import type { JobFormInput } from '~/models/job/index'
import { jobSchema } from '~/models/job/schemas'
import { useJobs } from '@/composables/useJobs'
import { useAuth } from '@/composables/useAuth'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['onShowModal'])

const { addJob, loadJobs } = useJobs()
const { user } = useAuth()

const formData = ref<JobFormInput>(jobSchema.parse({}))

const isOpen = computed({
  get() {
    return props.showModal
  },
  set(newVal) {
    emit('onShowModal', newVal)
  },
})

const resetForm = () => (formData.value = jobSchema.parse({}))

const handleSubmit = () => {
  if (!user.value) return

  const newJob = {
    ...formData.value,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    userId: user.value.id,
  }

  console.log(newJob)

  addJob(newJob)
  loadJobs()
  resetForm()
  isOpen.value = false
}
</script>

<template>
  <div>
    <UModal v-model:open="isOpen" title="Modal with footer" description="This is useful when you want a form in a Modal." :ui="{ footer: 'justify-end' }">

    <template #body>
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">Create New Job</h2>
        </template>

        <UForm :schema="jobSchema" :state="formData" @submit="handleSubmit" class="space-y-4">
          <UInput v-model="formData.title" name="title" placeholder="Job Title" />
          <UInput v-model="formData.location" name="location" placeholder="Location" />
          <UTextarea v-model="formData.description" name="description" placeholder="Description" />
        </UForm>
      </UCard>
    </template>

    <template #footer="{ close }">
      <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
      <UButton @click="handleSubmit">Create</UButton>
    </template>
  </UModal>
  </div>
</template>
