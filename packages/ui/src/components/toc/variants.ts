import { tv, type VariantProps } from 'tailwind-variants'

export const tocVariants = tv({
  defaultVariants: {
    indicator: 'line',
  },
  slots: {
    indicator: `pointer-events-none absolute inset-0 z-10`,
    indicatorThumb: `
      absolute inset-s-0 rounded-full bg-foreground
      transition-[top,height,opacity] duration-200 ease-out inline-0.5
    `,
    indicatorTrack: `
      absolute inset-s-0 inset-bs-0 rounded-full bg-border inline-px
    `,
    item: `
      min-inline-0

      data-[depth="3"]:ps-2

      data-[depth="4"]:ps-3

      data-[depth="5"]:ps-4

      data-[depth="6"]:ps-5
    `,
    link: `
      block truncate text-muted-foreground transition-colors outline-none

      hover:text-foreground

      focus-visible:ring-2 focus-visible:ring-ring

      data-active:font-medium data-active:text-foreground
    `,
    list: `
      relative grid grid-cols-1 gap-2.5 text-sm

      in-data-[slot=toc-item]:mbs-2.5

      has-data-[slot=toc-indicator]:ps-4
    `,
    root: `not-prose sticky inset-bs-6 grid grid-cols-1 gap-2.5`,
    title: `text-xs font-medium text-muted-foreground uppercase`,
  },
})

export type TocVariants = VariantProps<typeof tocVariants>
