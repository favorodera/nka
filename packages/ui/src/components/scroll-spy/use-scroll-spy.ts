import { useResizeObserver, useScroll, useWindowSize } from '@vueuse/core'
import { computed, nextTick, onMounted, readonly, ref, toValue, watch } from 'vue'
import type { ScrollSpyContext, ScrollSpyTargetMeasurement, UseScrollSpyOptions, UseScrollSpyReturn } from './types'
import { provideScrollSpyContext } from './contexts'

/**
 * Headless scrollspy: tracks registered target elements within a scroll
 * context (window or a custom container) and exposes the reactive active
 * logical target.
 *
 * Targets register either declaratively through `ScrollSpyTarget` or by ID
 * lookup through the `ids` option (hybrid targeting). Both feed the same
 * logical-target registry, and several physical elements may back a single
 * logical target.
 *
 * Provides a {@link ScrollSpyContext} for descendant components.
 * @param options Options accepted by useScrollSpy.
 * @returns A {@link UseScrollSpyReturn} object.
 */
export function useScrollSpy(options: UseScrollSpyOptions = {}): UseScrollSpyReturn {
  const orientation = computed(() => options.orientation ?? 'vertical')
  const offset = computed(() => options.offset ?? 0)
  const behavior = computed(() => options.behavior ?? 'smooth')
  const container = computed(() => toValue(options.container) ?? undefined)

  /**
   * Logical target ID -> physical elements. Not reactive itself; `items`
   * mirrors the ordered keys for consumers and reactivity.
   */
  const registry = new Map<string, Set<HTMLElement>>()
  const items = ref<Array<string>>([])
  const activeId = ref<string>()

  /** Axis-projected measurements keyed by logical target ID. */
  const measurements = new Map<string, ScrollSpyTargetMeasurement>()

  /** Elements registered via the `ids` option, so they can be refreshed when the IDs change. */
  const discovered = new Map<string, HTMLElement>()

  /** Whether the scrollspy is tracking vertically or horizontally */
  const isVertical = computed(() => orientation.value === 'vertical')

  /**
   * Keeps `items` in document order: logical targets are sorted by the
   * document position of their earliest physical element.
   */
  function syncItems() {
    const ordered = [...registry]
      .filter(([, elements]) => elements.size > 0)
      .map(([id, elements]) => {
        let earliestElement: HTMLElement | undefined

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
        if (itemA.earliest === itemB.earliest) return 0

        return itemA
          .earliest
          .compareDocumentPosition(itemB.earliest) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1
      })
      .map(({ id }) => id)

    // Avoid notifying consumers when only physical elements changed.
    if (ordered.length !== items.value.length || ordered.some((id, index) => items.value[index] !== id)) {
      items.value = ordered
    }
  }

  /**
   * Registers a physical element for a logical target ID.
   * @param id Logical target ID.
   * @param element Physical element to register.
   */
  function register(id: string, element: HTMLElement) {
    let target = registry.get(id)

    if (!target) {
      target = new Set()
      registry.set(id, target)
    }

    if (target.has(element)) return

    target.add(element)
    syncItems()
    scheduleMeasure()
  }

  /**
   * Unregisters a physical element from a logical target ID.
   * @param id Logical target ID.
   * @param element Physical element to unregister.
   */
  function unregister(id: string, element: HTMLElement) {
    const target = registry.get(id)

    if (!target?.delete(element)) return

    // The logical target only lives while at least one physical element backs it.
    if (target.size === 0) registry.delete(id)
    syncItems()
    scheduleMeasure()
  }

  /**
   * Retries ID-based discovery for IDs whose elements were not in the DOM yet
   * when the `ids` option last changed (e.g. asynchronously rendered content).
   */
  function resolvePendingIds() {
    const ids = toValue(options.ids)

    if (!ids) return

    for (const id of ids) {
      if (!discovered.has(id)) continue

      const element = document.getElementById(id)

      if (element) {
        discovered.set(id, element)
        register(id, element)
      }
    }
  }

  /**
   * Converts a viewport-space rect coordinate into scroll-content coordinates
   * so measurements stay valid as the scroll position changes.
   */
  function remeasure() {
    resolvePendingIds()
    measurements.clear()

    const containerElement = container.value
    const containerRect = containerElement?.getBoundingClientRect()
    const vertical = isVertical.value

    const containerEdge = containerElement && containerRect
      ? (vertical ? containerRect.top : containerRect.left) - (vertical ? containerElement.scrollTop : containerElement.scrollLeft)
      : -(vertical ? window.scrollY : window.scrollX)

    for (const [id, elements] of registry) {
      let start = Infinity
      let end = -Infinity

      for (const element of elements) {
        const rect = element.getBoundingClientRect()

        // Union of the physical element rects, projected onto the active axis.
        start = Math.min(start, vertical ? rect.top : rect.left)
        end = Math.max(end, vertical ? rect.bottom : rect.right)
      }

      if (start <= end) {
        measurements.set(id, { end: end - containerEdge, start: start - containerEdge })
      }
    }
  }

  /**
   * Computes the current scroll metrics.
   * @returns An object containing the scroll metrics
   */
  function scrollMetrics() {
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

  /** Updates the active ID based on the scroll position. */
  function update() {
    // If there are no items, set the active ID to undefined
    if (items.value.length === 0) {
      if (activeId.value) {
        activeId.value = undefined
      }
      return
    }

    const { scrollPosition, scrollSize, viewportSize } = scrollMetrics()
    const maxScroll = scrollSize - viewportSize
    const trackingLine = scrollPosition + offset.value

    let next: string | undefined

    // At the end of the scroll range the last target can become active even
    // when there is not enough trailing content to pull its leading edge
    // across the tracking line. Guarded by `maxScroll` so non-scrollable
    // (short) content still uses the plain tracking-line rule. The 2px
    // tolerance absorbs fractional scroll positions reported by browsers.
    if (maxScroll > offset.value && scrollPosition > 0 && scrollPosition >= maxScroll - 2) {
      next = items.value.at(-1) ?? undefined
    } else {
      for (const id of items.value) {
        const measurement = measurements.get(id)

        if (!measurement) continue

        if (measurement.start <= trackingLine) {
          next = id
        } else {
          break
        }
      }
      // Before the first target's leading edge: fall back to the first target.
      next ??= items.value[0] ?? undefined
    }

    // Only notify consumers when the active target actually changes.
    if (next !== activeId.value) activeId.value = next
  }

  // Measurement and active-state work is batched per tick so mounting many
  // targets at once costs one measurement pass instead of one per target.
  let isMeasureScheduled = false

  /** Schedules a measurement and update. */
  function scheduleMeasure() {
    if (isMeasureScheduled) return

    isMeasureScheduled = true

    void nextTick(() => {
      isMeasureScheduled = false
      remeasure()
      update()
    })
  }

  /**
   * Scrolls to a target element.
   * @param id The logical target ID.
   */
  function scrollTo(id: string) {
    let measurement = measurements.get(id)

    // If there's no measurement, remeasure and try again.
    if (!measurement) {
      remeasure()
      measurement = measurements.get(id)
    }

    // If there's still no measurement, return.
    if (!measurement) return

    const destination = Math.max(measurement.start - offset.value, 0)
    const containerElement = container.value
    const axis = isVertical.value ? { top: destination } : { left: destination }

    if (containerElement) containerElement.scrollTo({ ...axis, behavior: behavior.value })
    else window.scrollTo({ ...axis, behavior: behavior.value })
  }

  /**
   * Checks if a logical target is currently active.
   * @param id The logical target ID.
   * @returns `true` if the logical target is currently active, `false` otherwise.
   */
  function isActive(id: string) {
    return activeId.value === id
  }

  // Tracking triggers

  const scrollTarget = computed<HTMLElement | Window>(() => container.value ?? globalThis.window)
  const { x, y } = useScroll(scrollTarget)
  watch([x, y], update)

  // Configuration changes that move the tracking line or swap the axis.
  watch([offset, orientation], () => {
    remeasure()
    update()
  })

  // Layout changes: the scroll container (or document body for window
  // scrolling) resizing means cached measurements may be stale.
  useResizeObserver(
    computed(() => container.value ?? document.body),
    scheduleMeasure,
  )

  const { height: windowHeight, width: windowWidth } = useWindowSize()
  watch([windowWidth, windowHeight], scheduleMeasure)

  // Hybrid targeting: ID-based discovery

  /**
   * Resolves `ids` to elements and syncs the discovered subset of the
   * registry. Elements registered declaratively by `ScrollSpyTarget` are
   * never touched here.
   */
  watch(() => toValue(options.ids), (ids) => {
    const nextIds = new Set(ids)

    for (const [id, element] of discovered) {
      if (nextIds.has(id)) {
        continue
      }

      discovered.delete(id)
      unregister(id, element)
    }

    for (const id of nextIds) {
      if (discovered.has(id)) continue

      const element = document.getElementById(id)

      if (element) {
        discovered.set(id, element)
        register(id, element)
      }
    }
  }, { immediate: true })

  onMounted(scheduleMeasure)

  const activeIndex = computed(() => (activeId.value === undefined ? -1 : items.value.indexOf(activeId.value)))

  provideScrollSpyContext({
    activeId: readonly(activeId),
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
    activeIndex,
    isActive,
    items: readonly(items),
    scrollTo,
  }
}
