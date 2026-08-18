import { useMutationObserver } from '@vueuse/core'
import { computed, type MaybeRefOrGetter, readonly, ref, toValue, watch } from 'vue'
import type { TocItem, UseTocReturn } from './types'

/**
 * Flattens the TOC tree into a flat list of IDs.
 * @param items The TOC tree nodes to flatten.
 * @returns A flat list of IDs.
 */
function flattenIds(items: ReadonlyArray<TocItem>): Array<string> {
  return items.flatMap(item => [item.id, ...flattenIds(item.children ?? [])])
}

/** Query selector for headings to include in the TOC. */
const QUERY_HEADINGS = 'h2, h3, h4, h5, h6'

/**
 * Extracts a hierarchical TOC tree from heading elements inside a container.
 *
 * Observes the container for DOM changes so the TOC stays in sync when
 * content is dynamically added or removed (e.g. after markdown rendering).
 *
 * Only headings that possess an `id` attribute are included.
 * @param container A ref or getter for the container HTMLElement whose headings should be indexed.
 * @returns A {@link UseTocReturn} object containing the TOC tree and related utilities.
 */
export function useToc(container: MaybeRefOrGetter<HTMLElement | null | undefined>): UseTocReturn {
  const tocItems = ref<Array<TocItem>>([])

  /**
   * Builds the TOC tree from the container's headings.
   *
   * It queries for headings, builds a flat list, and then transforms it into a nested
   * tree structure. Only headings that possess an `id` attribute are included.
   */
  function collectTocItems() {
    const root = toValue(container)

    if (!root) {
      tocItems.value = []
      return
    }

    const headings = root.querySelectorAll(QUERY_HEADINGS)
    const matchedHeadings = [...headings].filter(element => element.id)

    const tree: Array<TocItem> = []
    const stack: Array<{ depth: number, item: TocItem }> = []

    for (const heading of matchedHeadings) {
      const depth = Number(heading.tagName.charAt(1))
      const item: TocItem = {
        depth,
        id: heading.id,
        label: heading.textContent?.trim() ?? '',
      }

      // Pop stack until we find a parent with smaller depth
      while (stack.length > 0 && (stack.at(-1) as typeof stack[number]).depth >= depth) {
        stack.pop()
      }

      if (stack.length === 0) {
        tree.push(item)
      } else {
        const parent = (stack.at(-1) as typeof stack[number]).item
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(item)
      }

      stack.push({ depth, item })
    }

    tocItems.value = tree
  }

  // Initial collection + reactive updates when the container ref changes
  watch(() => toValue(container), (element) => {
    if (element) {
      collectTocItems()
    } else {
      tocItems.value = []
    }
  }, {
    flush: 'post',
    immediate: true,
  })

  // Keep in sync with dynamic content mutations
  useMutationObserver(
    () => toValue(container),
    () => collectTocItems(),
    {
      attributeFilter: ['id'],
      characterData: true,
      childList: true,
      subtree: true,
    },
  )

  /** Flat list of all IDs in document order (useful for ScrollSpy `ids`). */
  const ids = computed(() => flattenIds(tocItems.value))

  return {
    ids,
    items: readonly(tocItems),
    refresh: collectTocItems,
  }
}
