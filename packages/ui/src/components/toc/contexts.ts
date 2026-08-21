import type { ScrollSpyRootContext } from '@nka/components/scroll-spy'
import type { MaybeComputedElementRef } from '@vueuse/core'
import type { ComputedRef, Ref } from 'vue'
import { createContext } from 'reka-ui'

/** Context provided by `TocList` component to its children. */
export interface TocListContext {
  /** The currently active section ID */
  activeId: ScrollSpyRootContext['activeId']

  /** Registered item elements, keyed by id. Used by `TocIndicator` to measure and position itself. */
  itemRefs: Ref<Map<string, HTMLElement>>

  /** Reference to the list container element */
  listElement: MaybeComputedElementRef

  /** Register a target element for scroll detection */
  registerItem: ScrollSpyRootContext['registerTarget']

  /** Unregister a target element from scroll detection */
  unregisterItem: ScrollSpyRootContext['unregisterTarget']
}

/** Context provided by the `TocItem` component to its children. */
export interface TocItemContext {
  /** The id of the item. */
  id: string

  /** Whether the item is active. */
  isActive: ComputedRef<boolean>

  /** Hash of the id. */
  hash: ComputedRef<string>
}

export const [injectTocListContext, provideTocListContext] = createContext<TocListContext>('TocList')

export const [injectTocItemContext, provideTocItemContext] = createContext<TocItemContext>('TocItem')
