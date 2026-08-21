import { useIntersectionObserver } from '@vueuse/core'
import { computed, type MaybeRefOrGetter, type Ref, ref, toValue, watch } from 'vue'

/** Options for configuring the scroll spy behavior. */
export interface UseScrollSpyOptions {
  /**
   * The element whose bounds are used as the bounding box when testing for intersection.
   * @default undefined (whole document)
   */
  root?: MaybeRefOrGetter<HTMLElement | undefined>

  /**
   * A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
   * @default '-10% 0px -80% 0px'
   */
  rootMargin?: MaybeRefOrGetter<string>

  /**
   * Percentage(s) of target visibility required to trigger the callback (0.0 to 1.0).
   * Provide an array to trigger the callback at multiple visibility increments.
   * @default 0
   */
  threshold?: Array<number> | number

  /**
   * Array of target IDs to track.
   * Use `ScrollSpyTarget` component for declarative registration.
   */
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
 * @param options Configuration options for the scroll spy.
 * @returns An object containing the active target ID and methods to manage targets.
 */
export function useScrollSpy(options: UseScrollSpyOptions = {}): UseScrollSpyReturn {
  const rootElement = computed(() => toValue(options.root))
  const rootMargin = computed(() => toValue(options.rootMargin) ?? useScrollSpyDefaultOptions.rootMargin)
  const threshold = computed(() => options.threshold ?? useScrollSpyDefaultOptions.threshold)

  const activeId = ref<string>()
  const targets = ref<Map<string, HTMLElement>>(new Map())
  const intersectingElementsIds = new Set<string>()

  const targetElements = computed(() => {
    return targets.value.values().toArray()
  })

  // Re-resolve targetIds -> elements any time the id list itself changes
  // (e.g. once an async page's TOC finishes loading), rather than a single
  // one-shot pass at setup time when the DOM likely doesn't have these
  // elements yet. `flush: 'post'` runs this after Vue's own DOM updates.
  watch(
    () => toValue(options.targetIds) ?? [],
    (ids) => {
      const root = rootElement.value ?? document
      const idSet = new Set(ids)

      // Drop targets that are no longer in the list
      for (const id of targets.value.keys()) {
        if (!idSet.has(id)) {
          targets.value.delete(id)
        }
      }

      // Discover and add any new ones that exist in the DOM right now
      for (const id of ids) {
        if (targets.value.has(id)) {
          continue
        }

        const discoveredElement = root.querySelector<HTMLElement>(`#${CSS.escape(id)}`)

        if (discoveredElement) {
          targets.value.set(id, discoveredElement)
        }
      }
    },
    {
      flush: 'post',
      immediate: true,
    },
  )

  const intersectionObserver = useIntersectionObserver(
    targetElements,
    (observerEntries) => {
      for (const observerEntry of observerEntries) {
        const observerEntryId = observerEntry.target.id

        // Check if the target is intersecting
        if (observerEntry.isIntersecting) {
          intersectingElementsIds.add(observerEntryId)
        } else {
          intersectingElementsIds.delete(observerEntryId)
        }
      }

      // If no targets are intersecting, leave activeId as-is
      if (intersectingElementsIds.size === 0) {
        return
      }

      // Pick the top-most intersecting element, once, after processing all entries
      const topMostIntersectingElement = [...intersectingElementsIds]
        .map(id => targets.value.get(id))
        .filter((element): element is HTMLElement => !!element)
        .toSorted((elementA, elementB) => {
          return elementA.getBoundingClientRect().top - elementB.getBoundingClientRect().top
        })
        .at(0)

      activeId.value = topMostIntersectingElement?.id
    },
    {
      root: rootElement,
      rootMargin,
      threshold: threshold.value,
    },
  )

  /**
   * Registers a target element to be tracked by the scroll spy
   * @param id The ID of the target element
   * @param element The target element
   */
  function registerTarget(id: string, element: HTMLElement) {
    targets.value.set(id, element)
  }

  /**
   * Unregisters a target element from being tracked by the scroll spy
   * @param id The ID of the target element
   */
  function unregisterTarget(id: string) {
    targets.value.delete(id)

    // If the active id is the one being removed, clear it
    if (activeId.value === id) {
      activeId.value = undefined
    }
  }

  /**
   * Scrolls to a target element by its ID
   * @param id The ID of the target element
   */
  function scrollTo(id: string) {
    const root = rootElement.value ?? document
    const element = root.querySelector<HTMLElement>(`#${CSS.escape(id)}`)

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
