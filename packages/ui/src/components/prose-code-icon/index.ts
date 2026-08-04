import { tv, type VariantProps } from 'tailwind-variants'
import type { IconProps } from '../icon'

// Variants
export const proseCodeIconVariants = tv({
  slots: {
    root: '',
  },
})

export type ProseCodeIconVariants = VariantProps<typeof proseCodeIconVariants>

// Component and utils
export { default as ProseCodeIcon } from './prose-code-icon.vue'
export { languageIconMap, resolveIconFromFilename } from './utils'

// Props
export type ProseCodeIconProps = Partial<IconProps> & {
  /**
   * Filename to associate the icon with
   * Used to determine the icon to display if none is provided
   */
  filename?: string
}
