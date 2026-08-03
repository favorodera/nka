import { tv, type VariantProps } from 'tailwind-variants'
import type { WithClass } from '../../utils/props'

export const preVariants = tv({
  slots: {
    root: '',
  },
})

export type PreVariants = VariantProps<typeof preVariants>

export { default as Pre } from './pre.vue'

export type PreProps = WithClass
