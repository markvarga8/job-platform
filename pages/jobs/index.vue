<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useJobStore } from '~/stores/jobs';
import { useHead } from '#imports';

useHead({ title: 'Job List' });

const jobStore = useJobStore();
const isLoading = ref(true);

const searchRaw = ref('');
const search = ref('');
const debounceDelay = 300;

let timeout: ReturnType<typeof setTimeout>;

watch(searchRaw, (val) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    search.value = val;
  }, debounceDelay);
});

onMounted(async () => {
  await jobStore.loadJobs();
  isLoading.value = false;
});

const filteredJobs = computed(() => {
  const keyword = search.value.trim().toLowerCase();

  if (!keyword) return jobStore.jobs;

  return jobStore.jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(keyword) || job.location.toLowerCase().includes(keyword)
  );
});

const notFoundText = computed(() => {
  if (jobStore.jobs.length > 0 && !filteredJobs.value.length) {
    return 'We couldn’t find any jobs matching your search. Try using different keywords or clearing the filters.';
  }

  return 'No jobs available right now';
});
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

    <no-results-box v-else-if="filteredJobs.length === 0" :not-found-text="notFoundText" />

    <div v-else class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      <job-list-item v-for="job in filteredJobs" :key="`job-${job.id}`" :job="job" />
    </div>
  </div>
</template>
