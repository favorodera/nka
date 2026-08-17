import type { ClassProp } from '@nka/utils/props'
import type { PrimitiveProps } from 'reka-ui'
import { tv, type VariantProps } from 'tailwind-variants'

// Variants
export const buttonVariants = tv({
  defaultVariants: {
    size: 'md',
    square: false,
    variant: 'outline',
  },
  slots: {
    root: `
      not-prose relative inline-flex shrink-0 items-center justify-center border
      border-transparent bg-clip-padding font-medium transition-all outline-none
      select-none

      focus-visible:ring-2 focus-visible:ring-nka-ring

      active:not-disabled:not-aria-[haspopup]:translate-y-px

      disabled:cursor-not-allowed disabled:opacity-70
    `,
  },
  variants: {
    size: {
      md: {
        root: `
          gap-1.5 rounded-lg px-2.5 text-sm block-8 min-inline-8

          *:[svg]:block-4 *:[svg]:inline-4
        `,
      },
      sm: {
        root: `
          gap-1 rounded-lg px-2 text-xs block-7 min-inline-7

          *:[svg]:block-3.5 *:[svg]:inline-3.5
        `,
      },
    },
    square: {
      false: {
        root: 'min-inline-fit',
      },
      true: {
        root: 'px-0',
      },
    },
    variant: {
      outline: {
        root: `
          border-nka-border bg-transparent text-nka-foreground

          hover:not-disabled:bg-nka-muted
        `,
      },
    },
  },
})

export type ButtonVariants = VariantProps<typeof buttonVariants>

// Component
export { default as Button } from './button.vue'

// Props
export type ButtonProps = ClassProp & PrimitiveProps & {
  /**
   * Visual style variant.
   * @default 'outline'
   */
  variant?: ButtonVariants['variant']

  /**
   * Visual size scale.
   * @default 'md'
   */
  size?: ButtonVariants['size']

  /**
   * Render the button with equal dimensions.
   * @default false
   */
  square?: ButtonVariants['square']
}
