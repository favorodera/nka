import { tv } from 'tailwind-variants'

export const tocVariants = tv({
  slots: {
    indicator: 'absolute',
    item: `
      min-inline-0

      data-[depth=3]:ps-4

      data-[depth=4]:ps-6
    `,
    link: `
      block truncate rounded-md text-muted-foreground transition-colors
      outline-none

      hover:text-foreground

      focus-visible:ring-2 focus-visible:ring-ring

      data-active:font-medium data-active:text-foreground
    `,
    list: `flex flex-col gap-2`,
    root: `not-prose sticky inset-bs-6 text-sm`,
    title: `flex items-center gap-2 font-medium`,
  },
})
