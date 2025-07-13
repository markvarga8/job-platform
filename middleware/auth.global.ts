import { useAuthStore } from '~/stores/auth';
import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.client) return;

  const auth = useAuthStore();

  if (!auth.user) {
    await auth.loadUser();
  }

  const publicPages = ['/', '/login'];
  const isPublic = publicPages.includes(to.path);
  const userType = auth.user?.type;

  if (!auth.isLoggedIn && !isPublic) {
    return navigateTo('/login');
  }

  // applicant
  if (
    auth.isLoggedIn &&
    userType === 'applicant' &&
    !(to.path === '/' || to.path.startsWith('/jobs'))
  ) {
    return navigateTo('/jobs');
  }

  // employer
  if (auth.isLoggedIn && userType === 'employer' && to.path === '/login') {
    return navigateTo('/dashboard');
  }
});
