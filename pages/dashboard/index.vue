<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useJobs } from '~/composables/useJobs'

useHead({ title: 'Dashboard' })

const { user } = useAuth()
const { loadJobs, getUserJobs, deleteJob } = useJobs()

const isShowJobCreateModal = ref(false)

watch(isShowJobCreateModal, (newValue) => {
  if (!newValue) {
    loadJobs()
  }
})

onMounted(() => loadJobs())

const myJobs = getUserJobs(user.value!.id)
</script>

<template>
  <div class="max-w-3xl mx-auto mt-10 space-y-6">
    <h1 class="text-2xl font-bold">My Job Listings</h1>
    <UButton icon="i-heroicons-plus" @click="isShowJobCreateModal = true">Post New Job</UButton>

    <job-create-modal
      :show-modal="isShowJobCreateModal"
      @on-show-modal="($event) => (isShowJobCreateModal = $event)"
    />

    <div v-if="myJobs.length === 0" class="text-gray-500">No jobs posted yet.</div>

    <div v-else class="space-y-4">
      <UCard v-for="job in myJobs" :key="job.id">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">{{ job.title }}</h2>
            <small class="text-sm text-gray-500">{{ job.location }}</small>
          </div>
        </template>

        <p class="mb-2">{{ job.description }}</p>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton variant="soft">Edit</UButton>
            <UButton variant="soft" @click="deleteJob(job.id)">Delete</UButton>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
