<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { JobFormInput } from '~/models/job/index';
import { jobSchema } from '~/models/job/schemas';
import { useJobStore } from '~/stores/jobs';
import { useAuthStore } from '~/stores/auth';
import { useToast } from '#imports';

const props = withDefaults(
  defineProps<{
    showModal: boolean;
    job?: JobFormInput | null;
  }>(),
  {
    showModal: false,
    job: null,
  }
);

const emit = defineEmits(['onShowModal']);

const auth = useAuthStore();
const jobs = useJobStore();
const toast = useToast();

const isOpen = computed({
  get: () => props.showModal,
  set: (val: boolean) => emit('onShowModal', val),
});

const formData = ref<JobFormInput>(jobSchema.parse({}));
const isSubmitting = ref(false);

watch(isOpen, (newValue: boolean) => {
  if (newValue && props.job) {
    formData.value = jobSchema.parse({ ...props.job });
  } else if (newValue) {
    formData.value = jobSchema.parse({});
  }
});

const isEdit = computed(() => !!props.job);

const handleSubmit = async () => {
  const { title } = formData.value;

  if (!title.trim()) {
    toast.add({
      title: 'Title is required',
      description: 'Please fill out the title field before submitting.',
      color: 'error',
    });
    return;
  }

  isSubmitting.value = true;

  if (isEdit.value && props.job) {
    jobs.updateJob(props.job.id, formData.value);
    toast.add({
      title: 'Job updated successfully',
      description: 'Your changes were saved.',
      color: 'success',
    });
  } else {
    if (!auth.isLoggedIn || !auth.getUser) return;
    const newJob = {
      ...formData.value,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      userId: auth.getUser.id,
    };
    jobs.addJob(newJob);
    await jobs.loadJobs();
    toast.add({
      title: 'Job created successfully',
      description: 'Your job was posted.',
      color: 'success',
    });
  }

  isOpen.value = false;
  isSubmitting.value = false;
};
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="isEdit ? 'Edit Job' : 'Post a New Job'"
    :description="isEdit ? 'Update job details.' : 'Fill out the form to advertise your position.'"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">
            {{ isEdit ? `Editing: ${formData.title || 'Job'}` : 'Job Details' }}
          </h2>
        </template>

        <UForm
          :state="formData"
          :schema="jobSchema"
          class="space-y-4"
          @submit.prevent="handleSubmit"
        >
          <UInput
            v-model="formData.title"
            name="title"
            label="Job Title"
            placeholder="Frontend Developer"
            class="w-full"
            required
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
          <div class="grid grid-cols-2 gap-4">
            <UInput
              v-model.number="formData.salary.amount"
              name="salaryAmount"
              label="Salary Amount"
              placeholder="e.g. 500000"
              type="number"
              class="w-full"
            />
            <UInput
              v-model="formData.salary.currency"
              name="salaryCurrency"
              label="Currency"
              placeholder="e.g. HUF, EUR"
              class="w-full"
            />
          </div>
        </UForm>
      </UCard>
    </template>

    <template #footer>
      <UButton label="Cancel" variant="outline" @click="isOpen = false" />
      <UButton
        :label="isEdit ? 'Save Changes' : 'Create'"
        :loading="isSubmitting"
        @click="handleSubmit"
      />
    </template>
  </UModal>
</template>
