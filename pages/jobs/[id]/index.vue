<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '~/stores/jobs'
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'
import type { JobFormInput } from '~/models/job/index'

const route = useRoute()
const router = useRouter()

const jobStore = useJobStore()
const authStore = useAuthStore()
const toast = useToast()

const { user } = storeToRefs(authStore)

const isLoading = ref(true)
const job = ref<JobFormInput | null>(null)

const jobId = Number(route.params.id)

const loadJob = async () => {
  await jobStore.loadJobs()
  const foundJob = jobStore.getJobById(jobId)
  if (!foundJob) {
    router.replace('/jobs')
    return
  }
  job.value = foundJob
  isLoading.value = false
}

onMounted(() => {
  isLoading.value = false
  loadJob()
})

const hasApplied = computed(() => {
  return authStore.hasApplied(jobId)
})

watch(job, (newJob) => {
  if (newJob) {
    useHead({
      title: `${newJob.title} – Job Details`,
    })
  }
})

const handleApply = () => {
  authStore.applyToJob(jobId)
  toast.add({
    title: 'Application sent',
    description: 'You have successfully applied for this job.',
    color: 'success',
  })
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 mt-10 space-y-4">
    <div v-if="isLoading" class="flex justify-center py-20">
      <UProgress animation="swing" size="md" icon="i-heroicons-arrow-path" />
    </div>

    <div v-else-if="job">
      <h1 class="text-2xl font-bold">{{ job.title }}</h1>
      <p class="text-gray-600">
        {{ job.location }} — {{ new Date(job.createdAt).toLocaleDateString() }}
      </p>

      <UCard>
        <p class="text-base whitespace-pre-line">{{ job.description }}</p>
      </UCard>

      <div v-if="user?.role === 'seeker'" class="mt-6">
        <UAlert v-if="hasApplied" variant="subtle" title="You have already applied for this job." />
        <UButton v-else color="primary" block @click="handleApply"> Apply for this job </UButton>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 py-10">Job not found.</div>
  </div>
</template>
