import type { HTMLAttributes } from 'vue'

/**
 * Adds a `class` prop to a component's props.
 * @template TProps - The original component props type.
 */
export type WithClass<TProps = object> = TProps & {
  /** Custom style class */
  class?: HTMLAttributes['class']
}
