import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: { vue: true },
  entry: {
    'components/*': 'src/components/**/index.ts',
    'utils/*': 'src/utils/*',
  },
  exports: true,
  fromVite: true,
  minify: true,
  platform: 'neutral',
})
