import type { HTMLAttributes } from 'vue'

/** Adds a `class` prop to a component's props. */
export interface ClassProp {
  /** Custom style class */
  class?: HTMLAttributes['class']
}
