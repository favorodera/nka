import { factory } from '@favorodera/eslint-config'

export default factory({
  pnpm: false,
  tailwind: {
    entryPoint: 'src/assets/index.css',
  },
})
  .append({
    files: ['src/**/*.vue'],
    rules: {
      'tailwind/no-unknown-classes': [
        'error',
        {
          ignore: ['prose'],
        },
      ],
    },
  })
