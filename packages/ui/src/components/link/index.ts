import type { ClassProp } from '@nka/utils/props'
import type { RouterLinkProps } from 'vue-router'
import { tv } from 'tailwind-variants'

// Variants
export const linkVariants = tv({
  slots: {
    root: `
      not-prose font-medium text-inherit underline decoration-1
      underline-offset-4 transition-colors outline-none

      hover:text-primary

      focus-visible:ring-2 focus-visible:ring-ring
    `,
  },
})

// Component
export { default as Link } from './link.vue'

// Props
export type LinkProps = ClassProp & RouterLinkProps
