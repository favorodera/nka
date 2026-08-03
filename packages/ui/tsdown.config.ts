import { defineConfig } from 'tsdown'

export default defineConfig({
  copy: 'src/css',
  css: {
    fileName: 'index.css',
  },
  dts: { vue: true },
  entry: [
    { 'components/*': 'src/components/**/index.ts' },
    { 'utils/*': 'src/utils/*' },
  ],
  exports: {
    customExports(pkg) {
      pkg['./css/theme'] = './dist/css/theme.css'
      pkg['./css/prose'] = './dist/css/prose.css'
      return pkg
    },
  },
  fromVite: true,
  minify: true,
  platform: 'neutral',
})

