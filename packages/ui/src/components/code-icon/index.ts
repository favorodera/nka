import type { IconProps } from '@nka/components/icon'
import { tv, type VariantProps } from 'tailwind-variants'

// Variants
export const codeIconVariants = tv({
  slots: {
    root: 'not-prose',
  },
})

export type CodeIconVariants = VariantProps<typeof codeIconVariants>

// Component and utils
export { default as CodeIcon } from './code-icon.vue'
export { languageIconMap, resolveIconFromFilename } from './utils'

// Props
export type CodeIconProps = Partial<IconProps> & {
  /**
   * Filename to associate the icon with
   * Used to determine the icon to display if none is provided
   */
  filename?: string
}
