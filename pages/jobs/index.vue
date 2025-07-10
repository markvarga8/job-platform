<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useJobStore } from '~/stores/jobs'
import { useHead } from '#imports'

useHead({ title: 'Job Listings' })

const jobStore = useJobStore()
const isLoading = ref(true)

const searchRaw = ref('')
const search = ref('')
const debounceDelay = 300

let timeout: ReturnType<typeof setTimeout>

watch(searchRaw, (val) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    search.value = val
  }, debounceDelay)
})

onMounted(async () => {
  await jobStore.loadJobs()
  isLoading.value = false
})

const filteredJobs = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  if (!keyword) return jobStore.jobs

  return jobStore.jobs.filter((job) =>
    job.title.toLowerCase().includes(keyword) ||
    job.location.toLowerCase().includes(keyword)
  )
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 mt-10 space-y-6">
    <h1 class="text-2xl font-bold">Job Listings</h1>

    <UInput
      v-model="searchRaw"
      placeholder="Search by title or location"
      icon="i-heroicons-magnifying-glass"
    />

    <div v-if="isLoading" class="flex justify-center py-20">
      <UProgress animation="swing" size="md" icon="i-heroicons-arrow-path" />
    </div>

    <div v-else-if="filteredJobs.length === 0" class="text-center text-gray-500 italic py-10">
      No matching jobs found.
    </div>

    <div v-else class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      <UCard
        v-for="job in filteredJobs"
        :key="job.id"
        class="cursor-pointer hover:ring-1 hover:ring-primary-500 transition"
        @click="$router.push(`/jobs/${job.id}`)"
      >
        <template #header>
          <div class="flex justify-between items-start">
            <h2 class="text-lg font-semibold break-words">{{ job.title }}</h2>
            <span class="text-sm text-gray-500 whitespace-nowrap">{{ job.location }}</span>
          </div>
        </template>
        <p class="text-sm text-gray-600 line-clamp-3">{{ job.description }}</p>
      </UCard>
    </div>
  </div>
</template>
