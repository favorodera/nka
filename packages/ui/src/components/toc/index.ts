// Contexts
export {
  injectTocItemContext,
  injectTocListContext,
  provideTocItemContext,
  provideTocListContext,
  type TocItemContext,
  type TocListContext,
} from './contexts'

// Components
export {
  default as TocRoot,
  type TocRootProps,
} from './toc-root.vue'

export {
  default as TocTitle,
  type TocTitleProps,
} from './toc-title.vue'

export {
  default as TocList,
  type TocListProps,
} from './toc-list.vue'

export {
  default as TocItem,
  type TocItemProps,
  type TocItemSlots,
} from './toc-item.vue'

export {
  default as TocLink,
  type TocLinkProps,
} from './toc-link.vue'

export {
  default as TocIndicator,
  type TocIndicatorProps,
} from './toc-indicator.vue'