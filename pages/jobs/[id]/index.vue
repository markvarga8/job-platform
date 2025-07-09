<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '~/stores/jobs'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const router = useRouter()
const jobStore = useJobStore()
const auth = useAuthStore()

const jobId = Number(route.params.id)
const job = jobStore.getJobById(jobId)

if (!job) {
  router.replace('/jobs')
}

const apply = () => auth.applyToJob(jobId)
</script>

<template>
  <div class="max-w-2xl mx-auto mt-10 space-y-4" v-if="job">
    <h1 class="text-2xl font-bold">{{ job.title }}</h1>
    <p class="text-gray-600">
      {{ job.location }} — {{ new Date(job.createdAt).toLocaleDateString() }}
    </p>

    <UCard>
      <p class="text-base whitespace-pre-line">{{ job.description }}</p>
    </UCard>

    <div v-if="auth.user?.role === 'seeker'" class="mt-6">
      <UAlert v-if="auth.hasApplied(jobId)" variant="subtle" title=" You have already applied for this job." />
      <UButton
        v-else
        color="primary"
        block
        @click="apply"
      >
        Apply for this job
      </UButton>
    </div>
  </div>
</template>
