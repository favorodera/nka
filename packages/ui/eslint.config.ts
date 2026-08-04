import { factory } from '@favorodera/eslint-config'

export default factory({
  pnpm: false,
  tailwind: {
    entryPoint: 'src/css/theme.css',
  },
})
  .append({
    files: ['src/components/**/*.vue'],
    rules: {
      'vue/no-root-v-if': 'off',
    },
  })
