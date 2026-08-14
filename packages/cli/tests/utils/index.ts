import type { ItemType, Registry } from '@nka/registry'
import type { NkaConfig } from '../../src/types'

/** Represents the Nka config for testing purposes. */
export const nkaConfig = {
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
} as const satisfies NkaConfig

/** Represents the Nka registry for testing purposes. */
export const nkaRegistry = {
  items: [
    {
      files: ['components/button/button.vue'],
      name: 'button',
      type: 'component',
    },
    {
      dependencies: {
        packages: {
          '@iconify/vue': '^5.0.1',
        },
      },
      files: ['components/icon/icon.vue'],
      name: 'icon',
      type: 'component',
    },
    {
      dependencies: {
        components: ['icon'],
      },
      files: ['components/prose-code-icon/prose-code-icon.vue'],
      name: 'prose-code-icon',
      type: 'component',
    },
    {
      dependencies: {
        components: [
          'icon',
          'prose-code-icon',
          'button',
        ],
      },
      files: ['components/prose-pre/prose-pre.vue'],
      name: 'prose-pre',
      type: 'component',
    },
    {
      dependencies: {
        utilities: ['props'],
      },
      files: ['utils/styling.ts'],
      name: 'styling',
      type: 'utility',
    },
    {
      files: ['utils/props.ts'],
      name: 'props',
      type: 'utility',
    },
  ],
  metadata: {
    baseUrl: 'https://example.com/',
    name: 'nka',
    version: '0.0.0',
  },
} as const satisfies Registry

/**
 * Gets a registry item by name and type.
 * @param name The name of the registry item to resolve from `nkaRegistry.items`
 * @param type The type of the registry item to resolve from `nkaRegistry.items`
 * @returns The registry item.
 */
export function getRegistryItem(name: typeof nkaRegistry.items[number]['name'], type: ItemType) {
  return nkaRegistry.items.find(item => item.name === name && item.type === type)
}
