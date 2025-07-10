<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useJobStore } from '~/stores/jobs'
import type { JobFormInput } from '~/models/job/index'
import { storeToRefs } from 'pinia'

useHead({ title: 'Dashboard' })

const auth = useAuthStore()
const jobs = useJobStore()
const { getUser } = storeToRefs(auth)
const toast = useToast()

const isShowJobCreateModal = ref(false)
const isShowJobEditModal = ref(false)
const isLoading = ref(true)
const jobToEdit = ref<JobFormInput | null>(null)

const loadMyJobs = async () => {
  await jobs.loadJobs()
}

watch(isShowJobCreateModal, (visible) => {
  if (!visible) loadMyJobs()
})

onMounted(() => {
  loadMyJobs()
  isLoading.value = false
})

const myJobs = computed(() => {
  return getUser.value?.id ? jobs.getJobsByUser(getUser.value.id) : []
})

const handleEdit = (job: JobFormInput) => {
  jobToEdit.value = job
  isShowJobEditModal.value = true
}

const handleDelete = async (id: number) => {
  await jobs.deleteJob(id)
  toast.add({
    title: 'Job deleted',
    description: 'The job offer has been removed.',
    color: 'success',
  })
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 mt-10 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-2xl font-bold">My Job Listings</h1>
      <UButton icon="i-heroicons-plus" @click="isShowJobCreateModal = true">Post New Job</UButton>
    </div>

    <job-create-modal
      :show-modal="isShowJobCreateModal"
      @on-show-modal="(val) => (isShowJobCreateModal = val)"
    />

    <div v-if="isLoading" class="flex justify-center py-20">
      <UProgress animation="swing" size="md" icon="i-heroicons-arrow-path" />
    </div>

    <div v-else-if="myJobs.length" class="grid gap-4 md:grid-cols-2">
      <UCard v-for="job in myJobs" :key="`job-${job.id}`" class="flex flex-col justify-between h-full">
        <template #header>
          <div class="flex justify-between items-start">
            <h2 class="text-lg font-semibold break-words">{{ job.title }}</h2>
            <span class="text-sm text-gray-500 whitespace-nowrap">{{ job.location }}</span>
          </div>
        </template>

        <p class="mb-4 text-sm text-gray-700">{{ job.description }}</p>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton variant="soft" size="sm" @click="handleEdit(job)">Edit</UButton>
            <UButton variant="soft" size="sm" @click="handleDelete(job.id)">Delete</UButton>
          </div>
        </template>
      </UCard>
    </div>

    <div v-else class="text-center text-gray-500 italic py-10">
      No jobs posted yet.
    </div>

    <job-edit-modal
      v-if="jobToEdit"
      :show-modal="isShowJobEditModal"
      :job="jobToEdit"
      @on-show-modal="(val) => (isShowJobEditModal = val)"
    />
  </div>
</template>
