<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import type { JobFormInput } from '~/models/job/index'
import { useJobStore } from '~/stores/jobs'
import { jobSchema } from '~/models/job/schemas'
import { useToast } from '#imports'

const props = defineProps<{
  job: JobFormInput
  showModal: boolean
}>()

const emit = defineEmits<{
  (e: 'onShowModal', value: boolean): void
}>()

const jobStore = useJobStore()
const toast = useToast()

const isOpen = computed({
  get: () => props.showModal,
  set: (val) => emit('onShowModal', val),
})

const formData = ref<JobFormInput>({ ...props.job })
const isSubmitting = ref(false)

watch(isOpen, async (newValue) => {
  if (!newValue) {
    formData.value = jobSchema.parse({})
  } else {
    formData.value = jobSchema.parse(props.job)
  }
})

const handleUpdate = async () => {
  const { title } = formData.value

  if (!title.trim()) {
    toast.add({
      title: 'Title is required',
      description: 'Please fill title fields before saving.',
      color: 'error',
    })
    return
  }

  isSubmitting.value = true

  jobStore.updateJob(props.job.id, formData.value)

  toast.add({
    title: 'Job updated successfully',
    description: 'Your changes were saved.',
    color: 'success',
  })

  isOpen.value = false
  isSubmitting.value = false
}
</script>

<template>
  <UModal v-model:open="isOpen" title="Edit Job" :ui="{ footer: 'justify-end' }">
    <template #body>
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">Editing: {{ formData.title || 'Job' }}</h2>
        </template>

        <UForm class="space-y-4">
          <UInput
            v-model="formData.title"
            name="title"
            label="Job Title"
            placeholder="Frontend Developer"
            class="w-full"
          />
          <UInput
            v-model="formData.location"
            name="location"
            label="Location"
            placeholder="Budapest, Remote..."
            class="w-full"
          />
          <UTextarea
            v-model="formData.description"
            name="description"
            label="Description"
            placeholder="What should the applicant know?"
            autoresize
            class="w-full"
          />
        </UForm>
      </UCard>
    </template>

    <template #footer>
      <UButton label="Cancel" color="gray" variant="outline" @click="isOpen = false" />
      <UButton @click="handleUpdate" form="edit-job-form" :loading="isSubmitting">
        Save Changes
      </UButton>
    </template>
  </UModal>
</template>
