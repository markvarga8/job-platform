<script setup lang="ts">
import { ref, computed, withDefaults, defineEmits, defineProps } from 'vue'
import type { JobFormInput } from '~/models/job/index'
import { jobSchema } from '~/models/job/schemas'
import { useJobStore } from '~/stores/jobs'
import { useAuthStore } from '~/stores/auth'

const props = withDefaults(
  defineProps<{
    showModal: boolean
  }>(),
  {
    showModal: false,
  }
)

const emit = defineEmits<{
  (e: 'onShowModal', value: boolean): void
}>()

const auth = useAuthStore()
const jobs = useJobStore()
const toast = useToast()

const formData = ref<JobFormInput>(jobSchema.parse({}))
const isSubmitting = ref(false)

const isOpen = computed({
  get: () => props.showModal,
  set: (val) => emit('onShowModal', val),
})

const resetForm = () => {
  formData.value = jobSchema.parse({})
}

const handleSubmit = async () => {
  if (!auth.isLoggedIn || !auth.getUser) return

  const { title, location, description } = formData.value

  if (!title.trim()) {
    toast.add({
      title: 'Title is required',
      description: 'Please fill out title before submitting.',
      color: 'error',
    })
    return
  }

  isSubmitting.value = true

  const newJob = {
    ...formData.value,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    userId: auth.getUser.id,
  }

  jobs.addJob(newJob)
  await jobs.loadJobs()
  resetForm()
  isOpen.value = false

  toast.add({
    title: 'Job created successfully',
    description: 'Your job was posted.',
    color: 'success',
  })

  isSubmitting.value = false
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Post a New Job"
    description="Fill out the form to advertise your position."
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">Job Details</h2>
        </template>

        <UForm :schema="jobSchema" :state="formData" @submit="handleSubmit" class="space-y-4">
          <UInput
            v-model="formData.title"
            name="title"
            placeholder="Frontend Developer"
            label="Title"
            class="w-full"
            required
          />

          <UInput
            v-model="formData.location"
            name="location"
            placeholder="Budapest, Remote..."
            label="Location"
            class="w-full"
          />

          <UTextarea
            v-model="formData.description"
            name="description"
            placeholder="Describe the job..."
            label="Description"
            autoresize
            class="w-full"
          />

          <div class="hidden">
            <button type="submit" />
          </div>
        </UForm>
      </UCard>
    </template>

    <template #footer>
      <UButton label="Cancel" color="gray" variant="outline" @click="isOpen = false" />
      <UButton label="Create" :loading="isSubmitting" @click="handleSubmit" />
    </template>
  </UModal>
</template>
