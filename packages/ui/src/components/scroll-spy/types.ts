import type { ClassProp } from '@nka/utils/props'
import type { ComputedRef, MaybeRefOrGetter, Ref, UnwrapRef } from 'vue'

/** Axis along which the scrollspy tracks targets. */
export type ScrollSpyOrientation = 'horizontal' | 'vertical'

/** Options accepted by {@link useScrollSpy}. */
export interface UseScrollSpyOptions {
  /**
   * Axis along which targets are tracked.
   * @default 'vertical'
   */
  orientation?: ScrollSpyOrientation

  /**
   * Distance in pixels from the leading edge of the scroll viewport where the
   * tracking line sits. A target becomes active once its leading edge crosses
   * this line. Also applied when programmatically scrolling to a target.
   * @default 0
   */
  offset?: number

  /**
   * Custom scroll container. When omitted, the window scroll context is used.
   * @default undefined
   */
  container?: MaybeRefOrGetter<HTMLElement | null | undefined>

  /**
   * Scroll behavior for programmatic navigation.
   * @default 'smooth'
   */
  behavior?: ScrollBehavior

  /**
   * Logical target IDs to track by DOM lookup (`document.getElementById`).
   *
   * This is the convenient half of the hybrid targeting model: pass IDs for
   * content you don't control (e.g. rendered markdown), and use
   * `ScrollSpyTarget` for elements you want to register declaratively. Both
   * sources feed the same logical-target registry.
   */
  ids?: MaybeRefOrGetter<null | ReadonlyArray<string> | undefined>
}

/** Return type of {@link useScrollSpy}. */
export type UseScrollSpyReturn = Pick<
  ScrollSpyContext,
  'activeId' | 'isActive' | 'items' | 'scrollTo'
> & {
  /** Index of the currently active logical target in `items`. */
  activeIndex: ComputedRef<number>
}

// Context

/** Shared state provided by {@link useScrollSpy} to descendant primitives. */
export interface ScrollSpyContext {
  /** Currently active logical target ID. */
  activeId: Readonly<Ref<string | undefined>>

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

/**
 * Internal registry entry: one logical target backed by one or more physical
 * DOM elements (multi-targeting).
 */
export interface ScrollSpyTarget {
  /** Logical target ID exposed to consumers. */
  id: string

  /** Physical DOM elements measured for this logical target. */
  elements: Set<HTMLElement>
}

/** Cached axis-projected geometry of a logical target, in scroll-content coordinates. */
export interface ScrollSpyTargetMeasurement {
  /** The end coordinate of the target element along the scroll axis */
  end: number

  /** The start coordinate of the target element along the scroll axis */
  start: number
}

// Props

/** `ScrollSpyRoot` component props */
export type ScrollSpyRootProps = ClassProp & UseScrollSpyOptions

/** `ScrollSpyTarget` component props */
export type ScrollSpyTargetProps = ClassProp & {
  /**
   * Logical target ID. Multiple targets may share an ID to contribute several
   * physical elements to the same logical target (multi-targeting).
   *
   * Also set as the element's `id` attribute so native anchors resolve.
   */
  id: string
}

// Slots

/** `ScrollSpyRoot` component slots */
export interface ScrollSpyRootSlot {
  default?: (props: Pick<UnwrapRef<UseScrollSpyReturn>, 'activeId' | 'activeIndex' | 'isActive' | 'items' | 'scrollTo'>) => void
}

/** `ScrollSpyTarget` component slots */
export interface ScrollSpyTargetSlot {
  default?: (props: { isActive: boolean }) => void
}
