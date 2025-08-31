import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      enabled: true,
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'build/',
        '**/*.config.*',
        '**/*.test.*',
      ],
    },
    include: ['src/**/*.test.{ts,tsx}'],
    globals: true,
    setupFiles: [],
  },
})
