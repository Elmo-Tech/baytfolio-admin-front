import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import { validateEnv } from './src/shared/config/env-schema.ts'

export default defineConfig(({ mode }) => {
  if (mode !== 'test') {
    validateEnv({ ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env })
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
      env: { VITE_API_URL: 'http://127.0.0.1:8000/api/v1' },
      clearMocks: true,
      restoreMocks: true,
    },
  }
})
