<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useJobStore } from '~/stores/jobs'

const jobStore = useJobStore()

onMounted(() => {
    jobStore.loadJobs()
})

const searchRaw = ref('')
const search = ref('')
const debounceDelay = 300

let timeout: NodeJS.Timeout

watch(searchRaw, (val) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    search.value = val.trim().toLowerCase()
  }, debounceDelay)
})

const filteredJobs = computed(() => {
  return jobStore.jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.value) ||
      job.location.toLowerCase().includes(search.value)
    )
  })
})
</script>

<template>
  <div class="max-w-3xl mx-auto mt-10 space-y-6">
    <h1 class="text-2xl font-bold">Job Listings</h1>

    <UInput
      v-model="searchRaw"
      placeholder="Search by title or location"
      icon="i-heroicons-magnifying-glass"
    />

    <div v-if="filteredJobs.length === 0" class="text-gray-500">No matching jobs found.</div>

    <UCard
      v-for="job in filteredJobs"
      :key="job.id"
      class="cursor-pointer hover:ring-1 hover:ring-primary-500 transition"
      @click="$router.push(`/jobs/${job.id}`)"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ job.title }}</h2>
          <small class="text-sm text-gray-500">{{ job.location }}</small>
        </div>
      </template>
      <p class="text-sm text-gray-600 line-clamp-3">{{ job.description }}</p>
    </UCard>
  </div>
</template>
