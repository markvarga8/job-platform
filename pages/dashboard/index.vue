<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useJobStore } from '~/stores/jobs'
import type { JobFormInput } from '~/models/job/index'

useHead({ title: 'Dashboard' })

const auth = useAuthStore()
const jobs = useJobStore()

const isShowJobCreateModal = ref(false)
const isShowJobEditModal = ref(false)
const jobToEdit = ref<JobFormInput | null>(null)

watch(isShowJobCreateModal, (newValue) => {
  if (!newValue) {
    jobs.loadJobs()
  }
})

onMounted(() => jobs.loadJobs())

const myJobs = computed(() => {
  if (auth.getUser!.id) {
    return jobs.getJobsByUser(auth.getUser!.id)
  }

  return []
})
</script>

<template>
  <div class="max-w-3xl mx-auto mt-10 space-y-6">
    <h1 class="text-2xl font-bold">My Job Listings</h1>
    <UButton icon="i-heroicons-plus" @click="isShowJobCreateModal = true">Post New Job</UButton>

    <job-create-modal
      :show-modal="isShowJobCreateModal"
      @on-show-modal="($event) => (isShowJobCreateModal = $event)"
    />

    <div v-if="myJobs.length" class="space-y-4">
      <UCard v-for="job in myJobs" :key="`job-${job.id}`">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">{{ job.title }}</h2>
            <small class="text-sm text-gray-500">{{ job.location }}</small>
          </div>
        </template>

        <p class="mb-2">{{ job.description }}</p>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              variant="soft"
              @click="
                () => {
                  isShowJobEditModal = true
                  jobToEdit = job
                }
              "
              >Edit</UButton
            >
            <UButton variant="soft" @click="jobs.deleteJob(job.id)">Delete</UButton>
          </div>
        </template>
      </UCard>
    </div>
    <div v-else class="text-gray-500">No jobs posted yet.</div>

    <job-edit-modal
      v-if="jobToEdit"
      :show-modal="isShowJobEditModal"
      :job="jobToEdit"
      @on-show-modal="($event) => (isShowJobEditModal = $event)"
    />
  </div>
</template>
