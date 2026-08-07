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
      '@nka/components': fileURLToPath(new URL('src/components', import.meta.url)),
      '@nka/utils': fileURLToPath(new URL('src/utils', import.meta.url)),
    },
  },
})
