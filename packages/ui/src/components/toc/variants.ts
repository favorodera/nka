import { tv, type VariantProps } from 'tailwind-variants'

export const tocRoot = tv({
  base: 'not-prose grid grid-cols-1 gap-2 inline-full',
})

export const tocTitle = tv({
  base: 'text-sm text-muted-foreground',
})

export const tocList = tv({
  base: `
    relative grid grid-cols-1 gap-2

    has-data-[slot="toc-indicator"]:ps-2.5
  `,
})

export const tocItem = tv({
  base: 'relative flex items-center transition-colors duration-150',
  defaultVariants: {
    active: false,
    depth: 1,
  },
  variants: {
    active: {
      false: `
        text-muted-foreground

        hover:text-foreground
      `,
      true: 'text-foreground',
    },
    depth: {
      1: 'ps-0',
      2: 'ps-0',
      3: 'ps-2',
      4: 'ps-4',
      5: 'ps-6',
    },
  },
})

export const tocLink = tv({
  base: 'block truncate text-sm transition-colors inline-full',
})

export const tocIndicator = tv({
  slots: {
    root: 'absolute inset-s-0 inset-bs-0 block-full inline-0.5',
    thumb: `
      absolute inset-s-0 rounded-full bg-primary transition-[transform,height]
      duration-200 ease-out will-change-transform inline-full
    `,
    track: 'absolute inset-0 rounded-full bg-border inline-px',
  },
})

export type TocItemVariants = VariantProps<typeof tocItem>
