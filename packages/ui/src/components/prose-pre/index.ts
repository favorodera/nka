import type { ClassProp } from '@nka/utils/props'
import { tv, type VariantProps } from 'tailwind-variants'

// Variants
export const prosePreVariants = tv({
  defaultVariants: {
    copy: true,
  },
  slots: {
    code: `
      not-prose grid overflow-x-auto overscroll-y-auto p-3 font-mono text-sm
      tab-2 outline-none min-inline-0

      focus-visible:ring-2 focus-visible:ring-ring

      **:[.line]:block

      **:[.line.highlight]:-mx-3 **:[.line.highlight]:inline-block
      **:[.line.highlight]:bg-accent! **:[.line.highlight]:px-3
      **:[.line.highlight]:inline-[calc(100%+1.5rem)]
    `,
    copy: 'absolute inset-e-2 inset-bs-2 z-10',
    header: `
      flex items-center gap-2 border-be p-3 text-sm text-muted-foreground

      *:data-[slot=nka-prose-code-icon]:mbs-0.5
    `,
    root: `relative grid rounded-xl border bg-muted bg-clip-padding`,
  },
  variants: {
    copy: {
      false: {},
      true: {},
    },
  },
})

export type ProsePreVariants = VariantProps<typeof prosePreVariants>

// Component
export { default as ProsePre } from './prose-pre.vue'

// Props
export type ProsePreProps = ClassProp & {
  /**
   * Language of the code block
   * @default 'plaintext'
   */
  language?: string

  /**
   * Display a button to copy the code to the clipboard.
   * @default true
   */
  copy?: ProsePreVariants['copy']

  /** Code content */
  code?: string

  /**
   * The iconify or custom ID of the icon to display in header.
   * @see https://icon-sets.iconify.design/
   * @see https://iconify.design/docs/icon-components/vue/
   * @see https://github.com/nuxt/icon
   */
  icon?: string

  /** Filename of the code block */
  filename?: string

  /** Meta information for the code block */
  meta?: string

  /**
   * Line numbers to highlight
   * @default []
   */
  highlights?: Array<number>
}
