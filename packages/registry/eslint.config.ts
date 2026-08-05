import { factory } from '@favorodera/eslint-config'

export default factory({
  pnpm: false,
  tailwind: false,
  vue: false,
})
  .append({
    files: [
      'schemas/ts-schemas/**/*.ts',
      'scripts/build-registry.ts',
    ],
    rules: {
      'new-cap': ['off'],
    },
  })
