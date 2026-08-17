import type { LinkProps } from '@nka/components/link'
import type { ClassProp } from '@nka/utils/props'
import type { PrimitiveProps } from 'reka-ui'
import { tv, type VariantProps } from 'tailwind-variants'

// Variants
const paginationPreAndNextBase = tv({
  base: `
    flex items-start gap-2 rounded-xl border bg-clip-padding p-3 text-sm
    no-underline transition-colors outline-none inline-full

    hover:bg-nka-muted/50

    focus-visible:ring-2 focus-visible:ring-nka-ring

    *:data-[slot=icon]:block-4 *:data-[slot=icon]:inline-4

    **:data-[slot=icon]:translate-y-0.5
  `,
})

export const paginationVariants = tv({
  slots: {
    content: `flex flex-1 flex-col gap-1 text-sm min-inline-0`,
    description: 'line-clamp-1 text-nka-muted-foreground font-normal text-sm',
    next: paginationPreAndNextBase({
      class: 'justify-end text-end ms-auto',
    }),
    prev: paginationPreAndNextBase({
      class: 'justify-start',
    }),
    root: `
      not-prose mbs-10 flex items-center justify-between gap-4 border-bs pbs-6
    `,
    title: `line-clamp-1 text-sm font-medium text-nka-foreground`,
  },
})

export type PaginationVariants = VariantProps<typeof paginationVariants>

// Components
export { default as PaginationContent } from './pagination-content.vue'
export { default as PaginationDescription } from './pagination-description.vue'
export { default as PaginationNext } from './pagination-next.vue'
export { default as PaginationPrev } from './pagination-prev.vue'
export { default as PaginationRoot } from './pagination-root.vue'
export { default as PaginationTitle } from './pagination-title.vue'

// Props
export type PaginationContentProps = ClassProp & PrimitiveProps

export type PaginationDescriptionProps = ClassProp & PrimitiveProps

export type PaginationNextProps = LinkProps

export type PaginationPrevProps = LinkProps

export type PaginationRootProps = ClassProp & PrimitiveProps

export type PaginationTitleProps = ClassProp & PrimitiveProps
