// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}, // A helyes plugin használata
      autoprefixer: {},
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
