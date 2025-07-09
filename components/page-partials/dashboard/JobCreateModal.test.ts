import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JobCreateModal from '~/components/page-partials/dashboard/JobCreateModal.vue'
import { createTestingPinia } from '@pinia/testing'

describe('JobCreateModal', () => {
  it('renders and emits close on submit', async () => {
    const wrapper = mount(JobCreateModal, {
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn, // <-- ezt tedd hozzá
        stubActions: false, // ha azt akarod, hogy az action ténylegesen lefusson
      }),
    ],
  },
})

    // Open modal
    await wrapper.find('button').trigger('click')

    // Fill form fields
    await wrapper.find('input[name="title"]').setValue('Test Job')
    await wrapper.find('input[name="location"]').setValue('Remote')
    await wrapper.find('textarea[name="description"]').setValue('This is a test job.')

    // Submit
    await wrapper.find('form').trigger('submit.prevent')

    // Check if modal closed
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
  })
})
