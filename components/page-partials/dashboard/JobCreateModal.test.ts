import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import JobCreateModal from '~/components/page-partials/dashboard/JobCreateModal.vue'
import { createTestingPinia } from '@pinia/testing'

vi.stubGlobal('useToast', () => ({
  add: vi.fn(),
}))

describe('JobCreateModal', () => {
  it('mounts without errors', () => {
    const wrapper = mount(JobCreateModal, {
      props: {
        showModal: false,
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          }),
        ],
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
