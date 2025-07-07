import { withNuxt } from '@nuxt/eslint-config'

export default withNuxt({
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended', // Prettier integration
  ],
  rules: {
    'vue/multi-word-component-names': 'off', // index.vue stb.
    'no-console': 'warn',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
})
