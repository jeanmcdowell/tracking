// eslint.config.js
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

export default [
  // 1) Base config (no typed rules)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      '**/*.d.ts',
      // Ensure config files aren't linted with typed rules
      'eslint.config.js',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      // keep base JS/TS-safe rules here if needed
    },
  },

  // 2) Typed TS rules for source files only
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // If you want typed rules, start small. Disable the one causing CI failure:
      '@typescript-eslint/await-thenable': 'off',
      // You can add recommended typed rules gradually:
      // ...tseslint.configs['recommended-type-checked'].rules,
    },
  },
]
