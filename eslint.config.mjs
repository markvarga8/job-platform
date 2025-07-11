import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

const sharedGlobals = {
  ...globals.browser,
  ...globals.node,
  ...globals.es2021,
  defineProps: 'readonly',
  defineEmits: 'readonly',
  defineExpose: 'readonly',
  withDefaults: 'readonly',
};

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: sharedGlobals,
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...js.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: sharedGlobals,
    },
    plugins: {
      vue,
    },
    rules: {
      ...js.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-console': 'warn',
    },
  },
];
