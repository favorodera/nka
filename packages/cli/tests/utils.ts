import type { NkaConfig } from '../src/types'

export const nkaConfig: NkaConfig = {
  components: {
    dir: 'src/components',
    import: '@/components',
  },
  registries: {
    nka: 'https://example.com/index.json',
  },
  styles: {
    dir: 'src/assets/css',
  },
  utils: {
    dir: 'src/utils',
    import: '@/utils',
  },
}