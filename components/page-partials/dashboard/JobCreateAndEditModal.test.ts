import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import JobCreateModal from '~/components/page-partials/dashboard/JobCreateAndEditModal.vue';
import { createTestingPinia } from '@pinia/testing';

const globalStubs = {
  UInput: true,
  UTextarea: true,
  UForm: true,
  UCard: true,
  UButton: true,
  UModal: true,
};

vi.stubGlobal('useToast', () => ({
  add: vi.fn(),
}));

describe('JobCreateModal', () => {
  it('mounts without errors', () => {
    const wrapper = mount(JobCreateModal, {
      props: {
        showModal: false,
      },
      global: {
        stubs: globalStubs,
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
