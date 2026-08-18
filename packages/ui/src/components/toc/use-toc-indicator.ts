import { injectScrollSpyContext } from '@nka/components/scroll-spy'
import { useMutationObserver, useResizeObserver } from '@vueuse/core'
import {
  computed,
  type MaybeRefOrGetter,
  nextTick,
  onMounted,
  ref,
  toValue,
  watch,
} from 'vue'
import type { UseTocIndicatorReturn } from './types'

/**
 * Measures the active `TocItem` inside a container and exposes its geometry
 * as CSS custom properties so `TocIndicator` can position a thumb with pure
 * CSS instead of rewriting inline styles on every scroll tick.
 *
 * The active target is read from the nearest `ScrollSpyContext` — the same
 * one `TocItem` uses for `isActive` — and its element is located via
 * `[data-slot="toc-item"][data-active]`. No separate registry is required.
 *
 * The inline offset is taken from the item's `TocLink`, not the item itself.
 * Depth indentation lives on the item's padding, so the item box always
 * starts at the same edge; the link is what shifts with depth.
 *
 * @param container - Positioned element that active items are measured
 *   against (the immediate parent of `TocIndicator`, typically the root
 *   element of `TocList`).
 * @returns Geometry refs, a reactive style object, and a manual refresh.
 */
export function useTocIndicator(
  container: MaybeRefOrGetter<HTMLElement | null | undefined>,
): UseTocIndicatorReturn {
  const scrollSpy = injectScrollSpyContext()
  const containerElement = computed(() => toValue(container))

  const top = ref(0)
  const size = ref(0)
  const inset = ref(0)
  const isVisible = ref(false)

  /**
   * Re-measures the active item's geometry relative to the container.
   */
  function measure() {
    const root = containerElement.value
    const activeItem = root?.querySelector<HTMLElement>(
      '[data-slot="toc-item"][data-active]',
    )

    if (!root || !activeItem) {
      isVisible.value = false
      return
    }

    const activeLink
      = activeItem.querySelector<HTMLElement>('[data-slot="toc-link"]')
        ?? activeItem

    const rootRect = root.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()

    inset.value = linkRect.left - rootRect.left
    size.value = itemRect.height
    top.value = itemRect.top - rootRect.top + root.scrollTop
    isVisible.value = true
  }

  /**
   * Schedules a measurement on the next tick, after `data-active` has
   * updated in the DOM.
   */
  function scheduleMeasure() {
    void nextTick(measure)
  }

  watch(
    () => scrollSpy?.activeId.value,
    scheduleMeasure,
    { flush: 'post' },
  )

  useResizeObserver(containerElement, scheduleMeasure)

  useMutationObserver(containerElement, scheduleMeasure, {
    attributeFilter: ['data-active'],
    childList: true,
    subtree: true,
  })

  onMounted(scheduleMeasure)

  const style = computed(() => ({
    '--toc-indicator-inset': `${inset.value}px`,
    '--toc-indicator-size': `${size.value}px`,
    '--toc-indicator-top': `${top.value}px`,
  }))

  return {
    isVisible,
    refresh: measure,
    style,
  }
}
