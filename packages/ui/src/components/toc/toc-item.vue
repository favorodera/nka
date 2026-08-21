<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit, unrefElement, type UnRefElementReturn } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { computed, nextTick, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { injectTocListContext, provideTocItemContext } from './contexts'
import { tocItem, type TocItemVariants } from './variants'

export type TocItemProps = ClassProp & PrimitiveProps & {
  /** The depth of the item in the table of contents */
  depth: number

  /** The ID of the item. */
  id: string
}

export interface TocItemSlots {
  default?: (props: {
    /** Whether this item is currently active. */
    isActive: boolean
  }) => void
}
</script>

<script setup lang="ts">
defineSlots<TocItemSlots>()

const props = withDefaults(defineProps<TocItemProps>(), {
  as: 'li',
})

const delegatedProps = reactiveOmit(props, 'class', 'id', 'depth')

const forwardedProps = useForwardProps(delegatedProps)

const tocListContext = injectTocListContext()

const itemRef = useTemplateRef('itemRef')

const isActive = computed(() => props.id === tocListContext.activeId.value)

const hash = computed(() => `#${props.id}`)

provideTocItemContext({
  hash,
  id: props.id,
  isActive,
})

onMounted(async () => {
  await nextTick()

  const itemRefElement = unrefElement(itemRef) as Exclude<UnRefElementReturn, SVGElement>

  if (itemRefElement) {
    tocListContext.registerItem(props.id, itemRefElement)
  }
})

onBeforeUnmount(() => {
  tocListContext.unregisterItem(props.id)
})
</script>

<template>
  <Primitive
    ref="itemRef"
    data-slot="toc-item"
    :data-depth="props.depth"
    :data-id="props.id"
    :data-active="isActive ? '' : undefined"
    v-bind="forwardedProps"
    :class="tocItem({
      class: normalizeClass(props.class),
      depth: props.depth as TocItemVariants['depth'],
      active: isActive,
    })"
  >
    <slot :is-active="isActive" />
  </Primitive>
</template>
