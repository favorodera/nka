import { tv, type VariantProps } from 'tailwind-variants'
import type { WithClass } from '../../utils/props'

export const headingsVariants = tv({
  slots: {
    anchor: '',
    root: 'font-semibold',
  },
  variants: {
    level: {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      5: 'text-lg',
      6: 'text-base',
    },
  },
})

export type HeadingsVariants = VariantProps<typeof headingsVariants>

export type HeadingsProps = WithClass<{
  /** Unique identifier for the heading. */
  id?: string
}>
