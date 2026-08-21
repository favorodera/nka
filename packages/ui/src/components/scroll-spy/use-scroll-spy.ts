import { useIntersectionObserver } from '@vueuse/core'
import { computed, type MaybeRefOrGetter, type Ref, ref, toValue, watch } from 'vue'

/** Options for configuring the scroll spy behavior. */
export interface UseScrollSpyOptions {
  /**
   * The element used as the viewport for checking visibility.
   * @default undefined (uses the document viewport)
   */
  root?: MaybeRefOrGetter<HTMLElement | undefined>

  /**
   * Margin around the root. Can have values similar to CSS margin property.
   * @default '-10% 0px -80% 0px'
   */
  rootMargin?: MaybeRefOrGetter<string>

  /**
   * How much of the target must be visible before triggering (0.0 to 1.0).
   * @default 0
   */
  threshold?: Array<number> | number

  /** IDs of elements to track. Use `ScrollSpyTarget` for declarative registration. */
  targetIds?: MaybeRefOrGetter<Array<string>>
}

/** Return type for the useScrollSpy composable. */
export interface UseScrollSpyReturn {
  /** Currently active target ID. */
  activeId: Ref<string | undefined>

  /** Register a target element by ID. */
  registerTarget: (id: string, element: HTMLElement) => void

  /** Unregister a target element by ID. */
  unregisterTarget: (id: string) => void

  /** Scroll to a target element by ID. */
  scrollTo: (id: string) => void

  /** Stop the intersection observer. */
  stopObserver: () => void
}

/** Default options for the scroll spy. */
export const useScrollSpyDefaultOptions = {
  rootMargin: '-10% 0px -80% 0px',
  threshold: 0,
} satisfies UseScrollSpyOptions

/**
 * Converts a percentage string (e.g. "10%") into a decimal fraction.
 * @param value The percentage string to convert.
 * @returns The decimal fraction.
 */
function percentageToFraction(value: string) {
  if (value.endsWith('%')) {
    return Number(value) / 100
  }
  return 0
}

/**
 * Finds the top-most element by its vertical position in the viewport.
 * @param elements The elements to compare.
 * @returns The element closest to the top of the viewport.
 */
function getTopMostElement(elements: Iterable<HTMLElement>) {
  return [...elements]
    .toSorted((elementA, elementB) => elementA.getBoundingClientRect().top - elementB.getBoundingClientRect().top)
    .at(0)
}

/**
 * Tracks which section is currently visible while scrolling.
 * @param options Configuration for the scroll spy.
 * @returns Active section ID and helpers to manage targets.
 */
export function useScrollSpy(options: UseScrollSpyOptions = {}): UseScrollSpyReturn {
  const root = computed(() => toValue(options.root))
  const rootMargin = computed(() => toValue(options.rootMargin) ?? useScrollSpyDefaultOptions.rootMargin)
  const threshold = computed(() => options.threshold ?? useScrollSpyDefaultOptions.threshold)

  const activeId = ref<string>()
  const targets = ref<Map<string, HTMLElement>>(new Map())
  const intersectingElementsIds = new Set<string>()

  const targetElements = computed(() => {
    return targets.value.values().toArray()
  })

  // Watch target IDs so we can auto-discover elements in the DOM after updates.
  // `flush: 'post'` waits until Vue has finished rendering.
  watch(
    () => toValue(options.targetIds) ?? [],
    (ids) => {
      const rootElement = root.value ?? document

      const idSet = new Set(ids)

      // Remove targets that are no longer in the list.
      for (const id of targets.value.keys()) {
        if (idSet.has(id)) {
          continue
        }

        targets.value.delete(id)
        intersectingElementsIds.delete(id)
      }

      // Add newly discovered elements from the DOM.
      for (const id of ids) {
        if (targets.value.has(id)) {
          continue
        }

        const discoveredElement = rootElement.querySelector<HTMLElement>(`#${CSS.escape(id)}`)

        if (discoveredElement) {
          targets.value.set(id, discoveredElement)
        }
      }

      // Set the active section immediately instead of waiting for the
      // IntersectionObserver's first (sometimes stale) callback.
      seedActiveId()
    },
    { flush: 'post', immediate: true },
  )

  /**
   * Finds the top-most target overlapping the given vertical band.
   * @param topBand The top edge of the visibility band.
   * @param bottomBand The bottom edge of the visibility band.
   * @returns The top-most visible target, if any.
   */
  function findTopMostVisibleTarget(topBand: number, bottomBand: number) {
    const candidates = targets.value
      .values()
      .filter((element) => {
        const elementRectangle = element.getBoundingClientRect()

        return elementRectangle.bottom >= topBand && elementRectangle.top <= bottomBand
      })
      .toArray()

    return getTopMostElement(candidates)
  }

  /**
   * Checks which target sits inside the rootMargin band right now.
   * Used to set `activeId` immediately after targets are discovered,
   * without waiting for the IntersectionObserver callback.
   */
  function seedActiveId() {
    const rootElement = root.value

    const rootRectangle = rootElement
      ? rootElement.getBoundingClientRect()
      : {
          bottom: window.innerHeight,
          height: window.innerHeight,
          top: 0,
        }

    // Only handles percentage-based top/bottom margins.
    // Split is whitespace-delimited: "10% 0px 20%" -> ["10%", "0px", "20%"]
    const [marginTop = '0px', , marginBottom = marginTop] = rootMargin.value.trim().split(/\s+/, 3)

    const topBand = rootRectangle.top + rootRectangle.height * percentageToFraction(marginTop)
    const bottomBand = rootRectangle.bottom - rootRectangle.height * percentageToFraction(marginBottom)

    const topMostVisibleTarget = findTopMostVisibleTarget(topBand, bottomBand)

    if (topMostVisibleTarget) {
      activeId.value = topMostVisibleTarget.id
    }

    // Double-check after the next paint in case layout is still settling.
    requestAnimationFrame(() => {
      const topMostVisibleTargetAfterPaint = findTopMostVisibleTarget(topBand, bottomBand)

      if (topMostVisibleTargetAfterPaint) {
        activeId.value = topMostVisibleTargetAfterPaint.id
      }
    })
  }

  const intersectionObserver = useIntersectionObserver(
    targetElements,
    (entries) => {
      for (const entry of entries) {
        const entryId = entry.target.id

        if (entry.isIntersecting) {
          intersectingElementsIds.add(entryId)
        } else {
          intersectingElementsIds.delete(entryId)
        }
      }

      // If nothing is visible, keep the last active section.
      if (intersectingElementsIds.size === 0) {
        return
      }

      // Pick the top-most visible section.
      const visibleElements = [...intersectingElementsIds]
        .map(id => targets.value.get(id))
        .filter((element): element is HTMLElement => !!element)

      const topMost = getTopMostElement(visibleElements)
      activeId.value = topMost?.id
    },
    {
      root,
      rootMargin,
      threshold: threshold.value,
    },
  )

  /**
   * Registers a target element to be tracked.
   * @param id The target element's ID.
   * @param element The target element itself.
   */
  function registerTarget(id: string, element: HTMLElement) {
    targets.value.set(id, element)
  }

  /**
   * Unregisters a target element.
   * @param id The target element's ID.
   */
  function unregisterTarget(id: string) {
    targets.value.delete(id)
    intersectingElementsIds.delete(id)

    // If the active id is the one being removed, clear it
    if (activeId.value === id) {
      activeId.value = undefined
    }
  }

  /**
   * Smoothly scrolls to a target element.
   * @param id The target element's ID.
   */
  function scrollTo(id: string) {
    const rootElement = root.value ?? document
    const element = rootElement.querySelector<HTMLElement>(`#${CSS.escape(id)}`)

    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return {
    activeId,
    registerTarget,
    scrollTo,
    stopObserver: intersectionObserver.stop,
    unregisterTarget,
  }
}
