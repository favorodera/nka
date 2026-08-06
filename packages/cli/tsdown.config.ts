import { defineConfig } from 'tsdown'

export default defineConfig({
  deps: {
    alwaysBundle: ['@nka/registry'],
  },
  dts: true,
  exports: true,
  minify: true,
})
