import type { WithClass } from '@nka/utils/props'
import { tv, type VariantProps } from 'tailwind-variants'

// Variants
export const paginationVariants = tv({
  slots: {
    root: '',
  },
})

export type PaginationVariants = VariantProps<typeof paginationVariants>

// Components

// Props
export type PaginationRootProps = WithClass

export type PaginationTitleProps = WithClass

export type PaginationDescriptionProps = WithClass

export type PaginationItemProps = WithClass
