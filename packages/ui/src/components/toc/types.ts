import type { ClassProp } from '@nka/utils/props'
import type { PrimitiveProps } from 'reka-ui'
import type { ComputedRef, DeepReadonly, Ref } from 'vue'

/** A single item in the Table of Contents hierarchy. */
export interface TocItem {
  /** Element / logical target ID (matches heading `id`). */
  id: string

  /** Display label (usually the heading text). */
  label: string

  /** Heading depth (2 = h2, 3 = h3, …). */
  depth: number

  /** Nested child items. */
  children?: Array<TocItem>
}

/** Return type of the `useToc()` composable. */
export interface UseTocReturn {
  /** Flat list of all IDs in document order. */
  ids: ComputedRef<Array<string>>

  /** Hierarchical TOC tree. */
  items: Ref<DeepReadonly<ReadonlyArray<TocItem>>>

  /** Forces a re-scan of the container. */
  refresh: () => void
}

// Context
export type TocItemContext = Pick<TocItem, 'depth'> & {
  /** The id of the item (usually the heading id). */
  id: string

  /** Whether the item is active. */
  isActive: ComputedRef<boolean>

  /** Data active attribute. */
  dataActive: ComputedRef<string | undefined>

  /** Aria current attribute. */
  ariaCurrent: ComputedRef<'true' | undefined>

  /** Hash of the id. */
  hash: ComputedRef<string>

  /** Function to scroll to the item. */
  scroll: () => void
}

// Props
export type TocRootProps = ClassProp & PrimitiveProps

export type TocTitleProps = ClassProp & PrimitiveProps

export type TocListProps = ClassProp & PrimitiveProps

export type TocItemProps = ClassProp & Pick<TocItem, 'depth' | 'id'> & PrimitiveProps

export type TocLinkProps = ClassProp & PrimitiveProps

export type TocIndicatorProps = ClassProp & PrimitiveProps
