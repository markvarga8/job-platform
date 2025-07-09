import { defineStore } from 'pinia'
import type { JobFormInput } from '~/models/job/index'

const STORAGE_KEY = 'kibit-jobs'

export const useJobStore = defineStore('jobs', {
  state: () => ({
    jobs: [] as JobFormInput[],
  }),

  getters: {
    getJobsByUser: (state) => (userId: number) =>
      state.jobs.filter((job) => job.userId === userId),
    getJobById: (state) => (id: number) =>
      state.jobs.find((job) => job.id === id),
  },

  actions: {
    loadJobs() {
      const raw = localStorage.getItem(STORAGE_KEY)
      this.jobs = raw ? JSON.parse(raw) : []
    },

    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.jobs))
    },

    addJob(job: JobFormInput) {
      this.jobs.push(job)
      this.persist()
    },

    deleteJob(id: number) {
      this.jobs = this.jobs.filter((j) => j.id !== id)
      this.persist()
    },

    updateJob(id: number, updated: Partial<JobFormInput>) {
      const index = this.jobs.findIndex((j) => j.id === id)
      if (index !== -1) {
        this.jobs[index] = { ...this.jobs[index], ...updated }
        this.persist()
      }
    },
  },
})
