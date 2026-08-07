import type { WithClass } from '@nka/utils/props'
import { tv, type VariantProps } from 'tailwind-variants'

// Variants
export const iconVariants = tv({
  slots: {
    root: 'pointer-events-none shrink-0 block-4 inline-4',
  },
})

export type IconVariants = VariantProps<typeof iconVariants>

// Component and utils
export { default as Icon } from './icon.vue'
export { iconsConfig } from './utils'

// Props
export type IconProps = WithClass<{
  /**
   * The iconify or custom ID of the icon.
   * @see https://icon-sets.iconify.design/
   * @see https://iconify.design/docs/icon-components/vue/
   * @see https://github.com/nuxt/icon
   */
  name: string
}>
