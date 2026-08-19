import type { ComputedRef } from 'vue'
import { createContext } from 'reka-ui'

/** Context provided by TocItem to its children. */
export interface TocItemContext {
  /** The id of the item (usually the heading id). */
  id: string

  /** Heading depth (2 = h2, 3 = h3, …). */
  depth: number

  /** Whether the item is active. */
  isActive: ComputedRef<boolean>

  /** Data active attribute. */
  dataActive: ComputedRef<string | undefined>

  /** Aria current attribute. */
  ariaCurrent: ComputedRef<'true' | undefined>

  /** Hash of the id. */
  hash: ComputedRef<string>

  /** Function to scroll to the item. */
  scroll: () => void
}

export const [injectTocItemContext, provideTocItemContext] = createContext<TocItemContext>('TocItem')
