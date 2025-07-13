<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useJobStore } from '~/stores/jobs';
import type { JobFormInput } from '~/models/job/index';
import { storeToRefs } from 'pinia';
import { useHead, useToast } from '#imports';

useHead({ title: 'Dashboard' });

const auth = useAuthStore();
const jobs = useJobStore();
const { getUser } = storeToRefs(auth);
const toast = useToast();

const isShowJobCreateModal = ref(false);
const isShowJobEditModal = ref(false);
const isLoading = ref(true);
const jobToEdit = ref<JobFormInput | null>(null);

onMounted(async () => {
  await loadMyJobs();
  isLoading.value = false;
});

watch(isShowJobCreateModal, (visible: boolean) => {
  if (!visible) loadMyJobs();
});

const loadMyJobs = async () => {
  await jobs.loadJobs();
};

const myJobs = computed(() => {
  return getUser.value?.id ? jobs.getJobsByUser(getUser.value.id) : [];
});

const handleEdit = (job: JobFormInput) => {
  jobToEdit.value = job;
  setTimeout(() => {
    isShowJobEditModal.value = true;
  }, 150);
};

const handleDelete = async (id: number) => {
  await jobs.deleteJob(id);
  toast.add({
    title: 'Job deleted',
    description: 'The job offer has been removed.',
    color: 'success',
  });
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 mt-10 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <h1 class="text-2xl font-bold">My Job Listings</h1>
      <div>
        <UButton icon="i-heroicons-plus" @click="isShowJobCreateModal = true">Post New Job</UButton>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <UProgress animation="swing" size="md" icon="i-heroicons-arrow-path" />
    </div>

    <div v-else-if="myJobs.length" class="grid gap-4 md:grid-cols-2">
      <job-list-item
        v-for="job in myJobs"
        :key="`job-${job.id}`"
        :job="job"
        edit
        @onHandleEdit="handleEdit"
        @onHandleDelete="handleDelete"
      />
    </div>

    <no-results-box
      v-else
      :not-found-text="'You haven’t posted any jobs yet. Click the button above to create your first job offer.'"
    />

    <job-create-and-edit-modal
      :show-modal="isShowJobCreateModal"
      @on-show-modal="(val) => (isShowJobCreateModal = val)"
    />

    <job-create-and-edit-modal
      v-if="jobToEdit"
      :show-modal="isShowJobEditModal"
      :job="jobToEdit"
      @on-show-modal="(val) => (isShowJobEditModal = val)"
    />
  </div>
</template>
