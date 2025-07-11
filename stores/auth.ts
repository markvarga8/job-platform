import { defineStore } from 'pinia';
import type { User } from '~/models/users/index';

const AUTH_KEY = 'auth-user';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
    getUser: (state) => state.user,
  },
  actions: {
    loadUser() {
      const raw = localStorage.getItem(AUTH_KEY);
      this.user = raw ? JSON.parse(raw) : null;
    },
    setUser(user: User) {
      this.user = user;
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    },
    logout() {
      this.user = null;
      localStorage.removeItem(AUTH_KEY);
    },
    applyToJob(jobId: number) {
      if (this.user?.type !== 'applicant') return;

      if (!this.user.appliedJobIds) {
        this.user.appliedJobIds = [];
      }

      if (!this.user.appliedJobIds.includes(jobId)) {
        this.user.appliedJobIds.push(jobId);
        localStorage.setItem(AUTH_KEY, JSON.stringify(this.user));
      }
    },
    hasApplied(jobId: number): boolean {
      return this.user?.appliedJobIds?.includes(jobId) ?? false;
    },
  },
});
