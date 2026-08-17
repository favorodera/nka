import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@nka/components': fileURLToPath(new URL('../../packages/ui/src/components', import.meta.url)),
      '@nka/utils': fileURLToPath(new URL('../../packages/ui/src/utils', import.meta.url)),
      'content': fileURLToPath(new URL('content', import.meta.url)),
    },
  },
  server: {
    port: 5174,
  },
})
