import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import JobListItem from '~/components/JobListItem.vue';

const mockJob = {
  id: 1,
  title: 'Frontend Dev',
  location: 'Budapest',
  description: 'Awesome job',
  salary: { amount: 400000, currency: 'HUF' },
};

describe('JobListItem (smoke test)', () => {
  it('mounts without error', () => {
    const wrapper = mount(JobListItem, {
      props: {
        job: mockJob,
        edit: false,
      },
      global: {
        stubs: ['UCard', 'UButton'],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
