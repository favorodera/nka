import { tv, type VariantProps } from 'tailwind-variants'

export const tocVariants = tv({
  defaultVariants: {
    indicator: 'line',
  },
  slots: {
    indicator: `
      pointer-events-none absolute inset-s-0 z-10 bg-border block-full inline-px
    `,
    item: `
      min-inline-0

      data-[depth="3"]:ps-2

      data-[depth="4"]:ps-3

      data-[depth="5"]:ps-4

      data-[depth="6"]:ps-5
    `,
    link: `
      block truncate rounded-md ps-2.5 text-muted-foreground transition-colors
      outline-none

      hover:text-foreground

      focus-visible:ring-2 focus-visible:ring-ring

      data-active:font-medium data-active:text-foreground
    `,

    list: `
      relative grid grid-cols-1 gap-2.5 text-sm

      in-data-[slot=toc-item]:mbs-2.5
    `,
    root: `not-prose sticky inset-bs-6 grid grid-cols-1 gap-2.5`,
    title: `text-xs font-medium text-muted-foreground uppercase`,
  },
  variants: {
    indicator: {
      circuit: {
        indicator: '',
      },
      line: {
        indicator: '',
      },
    },
  },
})

export type TocVariants = VariantProps<typeof tocVariants>
