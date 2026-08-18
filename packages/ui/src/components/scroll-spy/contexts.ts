import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

/** Axis along which the scrollspy tracks targets. */
export type ScrollSpyOrientation = 'horizontal' | 'vertical'

/** Shared state provided by {@link useScrollSpy} to descendant primitives. */
export interface ScrollSpyContext {
  /** Currently active logical target ID. */
  activeId: Readonly<Ref<string | undefined>>

  /** All currently active target IDs in multiple mode. */
  activeIds: Readonly<Ref<ReadonlyArray<string>>>

  /** Registered logical target IDs in document order. */
  items: Readonly<Ref<ReadonlyArray<string>>>

  /** Tracking axis. */
  orientation: Readonly<Ref<ScrollSpyOrientation>>

  /** Tracking line offset in pixels. */
  offset: Readonly<Ref<number>>

  /** Programmatic scroll behavior. */
  behavior: Readonly<Ref<ScrollBehavior>>

  /** Whether a logical target is currently active. */
  isActive: (id: string) => boolean

  /** Adds a physical element to a logical target. */
  register: (id: string, element: HTMLElement) => void

  /** Removes a physical element from a logical target. */
  unregister: (id: string, element: HTMLElement) => void

  /** Scrolls to a logical target, respecting orientation, container and offset. */
  scrollTo: (id: string) => void
}

export const [injectScrollSpyContext, provideScrollSpyContext] = createContext<ScrollSpyContext>('ScrollSpyRoot')
