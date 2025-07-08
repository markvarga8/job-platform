import { ref } from 'vue'
import type { JobFormInput } from '~/models/job/index'

const STORAGE_KEY = 'kibit-jobs'
const jobs = ref<JobFormInput[]>([])

export function useJobs() {
  const loadJobs = (): void => {
    const raw = localStorage.getItem(STORAGE_KEY)
    jobs.value = raw ? JSON.parse(raw) : []
  }

  const saveJobs = (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs.value))
  }

  const getUserJobs = (userId: number): JobFormInput[] => {
    return jobs.value.filter((job) => job.userId === userId)
  }

  const addJob = (job: JobFormInput): void => {
    jobs.value.push(job)
    saveJobs()
  }

  const deleteJob = (id: number): void => {
    jobs.value = jobs.value.filter((j) => j.id !== id)
    saveJobs()
  }

  return {
    jobs,
    loadJobs,
    getUserJobs,
    addJob,
    deleteJob,
  }
}
