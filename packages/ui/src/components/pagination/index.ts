import type { LinkProps } from '@nka/components/link'
import type { ClassProp } from '@nka/utils/props'
import type { PrimitiveProps } from 'reka-ui'
import { tv, type VariantProps } from 'tailwind-variants'

// Variants
const paginationPreAndNextBase = tv({
  base: `
    flex items-start gap-2 rounded-xl border bg-clip-padding p-3 text-sm
    no-underline transition-colors outline-none max-inline-full min-inline-0

    only:col-span-full

    hover:bg-nka-muted/50

    focus-visible:ring-2 focus-visible:ring-nka-ring

    *:data-[slot=icon]:translate-y-0.5 *:data-[slot=icon]:block-4
    *:data-[slot=icon]:inline-4

    @max-lg/pagination-root:col-span-full
  `,
})

export const paginationVariants = tv({
  slots: {
    content: `flex-1 flex-col gap-1 min-inline-0`,
    description: `
      truncate text-sm font-normal text-nka-muted-foreground min-inline-0
    `,
    next: paginationPreAndNextBase({
      class: `
        justify-end text-end
      `,
    }),
    prev: paginationPreAndNextBase({
      class: `
        justify-start
      `,
    }),
    root: `
      not-prose @container/pagination-root mbs-10 grid grid-cols-2 gap-4
      border-bs pbs-6
    `,
    title: `truncate text-sm font-medium text-nka-foreground min-inline-0`,
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
