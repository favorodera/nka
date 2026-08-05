import { factory } from '@favorodera/eslint-config'

export default factory({
  pnpm: false,
  tailwind: false,
  vue: false,
})
  .append({
    files: ['src/ts-schemas/**/*.ts'],
    rules: {
      'new-cap': ['off'],
    },
  })
