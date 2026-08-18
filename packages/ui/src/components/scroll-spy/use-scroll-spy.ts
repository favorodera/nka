import { useResizeObserver, useScroll, useWindowSize } from '@vueuse/core'
import { 
  computed,
  type ComputedRef,
  type MaybeRefOrGetter,
  nextTick,
  onMounted,
  readonly,
  ref,
  toValue,
  watch 
} from 'vue'
import { provideScrollSpyContext, type ScrollSpyContext, type ScrollSpyOrientation } from './contexts'

export interface UseScrollSpyOptions {
  /** 
   * Axis along which targets are tracked.
   * @default 'vertical'
   */
  orientation?: ScrollSpyOrientation

  /** 
   * Distance in pixels from the leading edge where tracking line sits.
   * @default 0
   */
  offset?: number

  /** 
   * Custom scroll container. Omitted uses window scroll context.
   */
  container?: MaybeRefOrGetter<HTMLElement | null | undefined>

  /** 
   * Scroll behavior for programmatic navigation.
   * @default 'smooth'
   */
  behavior?: ScrollBehavior

  /** Logical target IDs to track by DOM lookup. Use ScrollSpyTarget for declarative registration. */
  ids?: MaybeRefOrGetter<null | ReadonlyArray<string> | undefined>

  /** 
   * Tracking mode: 'multiple' tracks all visible targets.
   * @default 'single'
   */
  mode?: 'multiple' | 'single'
}

export type UseScrollSpyReturn = Pick<
  ScrollSpyContext,
  'activeId' | 'isActive' | 'items' | 'scrollTo'
> & {
  /** All currently active target IDs in multiple mode. */
  activeIds: ComputedRef<Array<string>>

  /** Index of the currently active logical target in `items`. */
  activeIndex: ComputedRef<number>
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

/**
 * Headless scrollspy with hybrid targeting.
 * @param options Configuration options.
 * @returns Reactive scrollspy state and methods.
 */
export function useScrollSpy(options: UseScrollSpyOptions = {}): UseScrollSpyReturn {
  // Configuration
  const orientation = computed(() => options.orientation ?? 'vertical')
  const offset = computed(() => options.offset ?? 0)
  const behavior = computed(() => options.behavior ?? 'smooth')
  const container = computed(() => toValue(options.container) ?? undefined)
  const mode = computed(() => options.mode ?? 'single')

  // Registry maps logical target IDs to physical DOM elements
  const registry = new Map<string, Set<HTMLElement>>()
  const items = ref<Array<string>>([])
  const activeId = ref<string>()
  const activeIds = ref<Array<string>>([])

  // Cached measurements keyed by logical target ID
  const measurements = new Map<string, ScrollSpyTargetMeasurement>()

  // Elements discovered via ID lookup
  const elementsDiscoveredById = new Map<string, HTMLElement>()

  const isVertical = computed(() => orientation.value === 'vertical')

  /** Synchronizes items in document order. */
  function synchronizeItems() {
    const ordered = [...registry]
      .filter(([, elements]) => elements.size > 0)
      .map(([id, elements]) => {
        let earliestElement: HTMLElement | undefined

        // Find earliest element in document order.
        for (const element of elements) {
          if (!earliestElement || !!(earliestElement.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING)) {
            earliestElement = element
          }
        }

        return {
          earliest: earliestElement as HTMLElement,
          id,
        }
      })
      .toSorted((itemA, itemB) => {
        if (itemA.earliest === itemB.earliest) {
          return 0
        }

        // Sort by document position.
        if(itemA.earliest.compareDocumentPosition(itemB.earliest) & Node.DOCUMENT_POSITION_FOLLOWING) {
          return -1
        }

        return 1
      })
      .map(({ id }) => id)

    // Only update when order changes.
    if (ordered.length !== items.value.length || ordered.some((id, index) => items.value[index] !== id)) {
      items.value = ordered
    }
  }

  /**
   * Registers a physical element for a logical target.
   * @param id Logical target ID.
   * @param element Physical element to register.
   */
  function register(id: string, element: HTMLElement) {
    let target = registry.get(id)

    if (!target) {
      target = new Set()
      registry.set(id, target)
    }

    if (target.has(element)) {
      return
    }

    target.add(element)
    synchronizeItems()
    scheduleMeasurement()
  }

  /**
   * Unregisters a physical element from a logical target.
   * @param id Logical target ID.
   * @param element Physical element to unregister.
   */
  function unregister(id: string, element: HTMLElement) {
    const target = registry.get(id)

    if (!target?.delete(element)) {
      return
    }

    // Delete logical target when no elements remain.
    if (target.size === 0) {
      registry.delete(id)
    }
    
    synchronizeItems()
    scheduleMeasurement()
  }

  /** Retries ID-based discovery for asynchronously rendered content. */
  function resolvePendingIds() {
    const ids = toValue(options.ids)

    if (!ids) {
      return
    }

    for (const id of ids) {
      if (!elementsDiscoveredById.has(id)) {
        continue
      }

      const element = document.getElementById(id)

      if (element) {
        elementsDiscoveredById.set(id, element)
        register(id, element)
      }
    }
  }

  /** Converts viewport-space coordinates to scroll-content coordinates. */
  function measure() {
    resolvePendingIds()
    measurements.clear()

    const containerElement = container.value
    const containerRect = containerElement?.getBoundingClientRect()
    const vertical = isVertical.value

    // Calculate container edge in scroll-content coordinates.
    const containerEdge = containerElement && containerRect
      ? (vertical ? containerRect.top : containerRect.left) - (vertical ? containerElement.scrollTop : containerElement.scrollLeft)
      : -(vertical ? window.scrollY : window.scrollX)

    for (const [id, elements] of registry) {
      let start = Infinity
      let end = -Infinity

      for (const element of elements) {
        const rect = element.getBoundingClientRect()

        // Project element rects onto active axis.
        start = Math.min(start, vertical ? rect.top : rect.left)
        end = Math.max(end, vertical ? rect.bottom : rect.right)
      }

      if (start <= end) {
        measurements.set(id, {
          end: end - containerEdge,
          start: start - containerEdge,
        })
      }
    }
  }

  /**
   * Returns current scroll metrics.
   * @returns Scroll position, size, and viewport dimensions.
   */
  function getScrollMetrics() {
    const containerElement = container.value
    const vertical = isVertical.value

    if (containerElement) {
      return {
        scrollPosition: vertical ? containerElement.scrollTop : containerElement.scrollLeft,
        scrollSize: vertical ? containerElement.scrollHeight : containerElement.scrollWidth,
        viewportSize: vertical ? containerElement.clientHeight : containerElement.clientWidth,
      }
    }

    return {
      scrollPosition: vertical ? window.scrollY : window.scrollX,
      scrollSize: vertical ? document.documentElement.scrollHeight : document.documentElement.scrollWidth,
      viewportSize: vertical ? window.innerHeight : window.innerWidth,
    }
  }

  /** Updates the active ID based on scroll position. */
  function updateActiveState() {
    if (items.value.length === 0) {
      activeId.value = undefined
      activeIds.value = []
      return
    }

    const scrollMetrics = getScrollMetrics()
    const maxScroll = scrollMetrics.scrollSize - scrollMetrics.viewportSize
    const trackingLine = scrollMetrics.scrollPosition + offset.value
    const isMultiple = mode.value === 'multiple'

    if (isMultiple) {
      const visibleTargets: Array<string> = []

      // Find all targets intersecting tracking line.
      for (const id of items.value) {
        const measurement = measurements.get(id)

        if (!measurement) {
          continue
        }

        if (measurement.start <= trackingLine && measurement.end >= trackingLine) {
          visibleTargets.push(id)
        }
      }

      activeIds.value = visibleTargets
      activeId.value = visibleTargets[0]
    } else {
      let next: string | undefined

      // At scroll end, activate last target.
      if (maxScroll > 2 && scrollMetrics.scrollPosition >= maxScroll - 2) {
        next = items.value.at(-1) 
      } else {
        // Find target whose start is before tracking line.
        for (const id of items.value) {
          const measurement = measurements.get(id)

          if (!measurement) {
            continue
          }

          if (measurement.start <= trackingLine) {
            next = id
          } else {
            break
          }
        }

        // Fallback to first item if no match found
        next ??= items.value[0]
      }

      if (next !== activeId.value) {
        activeId.value = next
        activeIds.value = next ? [next] : []
      }
    }
  }

  let isMeasurementScheduled = false

  /** Schedules a measurement and update. */
  function scheduleMeasurement() {
    if (isMeasurementScheduled) {
      return
    }

    isMeasurementScheduled = true

    void nextTick(() => {
      isMeasurementScheduled = false
      measure()
      updateActiveState()
    })
  }

  /**
   * Scrolls to a target element.
   * @param id Logical target ID.
   */
  function scrollTo(id: string) {
    let measurement = measurements.get(id)

    if (!measurement) {
      measure()
      measurement = measurements.get(id)
    }

    if (!measurement) {
      return
    }

    const destination = Math.max(measurement.start - offset.value, 0)
    const containerElement = container.value
    const axis = isVertical.value ? { top: destination } : { left: destination }

    if (containerElement) {
      containerElement.scrollTo({
        ...axis,
        behavior: behavior.value,
      })
    } else {
      window.scrollTo({
        ...axis,
        behavior: behavior.value,
      })
    }
  }

  /**
   * Checks if a logical target is currently active.
   * @param id Logical target ID.
   * @returns Whether the target is active.
   */
  function isActive(id: string) {
    return activeId.value === id
  }

  const scrollTarget = computed<HTMLElement | Window>(() => container.value ?? globalThis.window)
  const scrollPosition = useScroll(scrollTarget)
  watch([scrollPosition.x, scrollPosition.y], updateActiveState)

  watch([offset, orientation], () => {
    measure()
    updateActiveState()
  })

  useResizeObserver(
    computed(() => container.value ?? document.body),
    scheduleMeasurement,
  )

  const windowSize = useWindowSize()
  watch([windowSize.width, windowSize.height], scheduleMeasurement)

  watch(() => toValue(options.ids), (ids) => {
    const nextIds = new Set(ids)

    // Unregister removed IDs.
    for (const [id, element] of elementsDiscoveredById) {
      if (nextIds.has(id)) {
        continue
      }

      elementsDiscoveredById.delete(id)
      unregister(id, element)
    }

    // Register new IDs.
    for (const id of nextIds) {
      if (elementsDiscoveredById.has(id)) {
        continue
      }

      const element = document.getElementById(id)

      if (element) {
        elementsDiscoveredById.set(id, element)
        register(id, element)
      }
    }
  }, { immediate: true })

  onMounted(scheduleMeasurement)

  const activeIndex = computed(() => (activeId.value === undefined ? -1 : items.value.indexOf(activeId.value)))
  const activeIdsComputed = computed(() => activeIds.value)

  provideScrollSpyContext({
    activeId: readonly(activeId),
    activeIds: readonly(activeIds),
    behavior,
    isActive,
    items: readonly(items),
    offset,
    orientation,
    register,
    scrollTo,
    unregister,
  })

  return {
    activeId: readonly(activeId),
    activeIds: activeIdsComputed,
    activeIndex,
    isActive,
    items: readonly(items),
    scrollTo,
  }
}
