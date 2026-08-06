import { factory } from '@favorodera/eslint-config'

export default factory({
  pnpm: false,
  tailwind: {
    entryPoint: 'src/assets/index.css',
  },
})
  .append({
    files: ['content/**/*.md'],
    rules: {
      'tailwind/no-unknown-classes': [
        'error',
        {
          ignore: ['prose'],
        },
      ],
    },
  })
