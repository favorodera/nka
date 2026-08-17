import { factory, tsGlob, vueGlob } from '@favorodera/eslint-config'

export default factory({
  pnpm: false,
  tailwind: {
    entryPoint: 'src/css/theme.css',
  },
})
  .append({
    files: [vueGlob],
    rules: {
      'vue/no-root-v-if': 'off',
    },
  })
  .append({
    files: [
      vueGlob,
      tsGlob,
    ],
    rules: {
      'tailwind/no-unknown-classes': [
        'error',
        {
          ignore: ['not-prose'],
        },
      ],
    },
  })
