<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { injectScrollSpyRootContext } from '@nka/components/scroll-spy'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { ref, useTemplateRef } from 'vue'
import { provideTocListContext } from './contexts'
import { tocList } from './variants'

export type TocListProps = ClassProp & PrimitiveProps
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<TocListProps>(), {
  as: 'ul',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const listRef = useTemplateRef('listRef')

const itemRefs = ref<Map<string, HTMLElement>>(new Map())

const scrollSpyRootContext = injectScrollSpyRootContext()

/**
 * Register a target element for scroll detection
 * @param id The ID of the target element
 * @param element The target element
 */
function registerItem(id: string, element: HTMLElement) {
  itemRefs.value.set(id, element)
}

/**
 * Unregister a target element from scroll detection
 * @param id The ID of the target element
 */
function unregisterItem(id: string) {
  itemRefs.value.delete(id)
}

provideTocListContext({
  activeId: scrollSpyRootContext.activeId,
  itemRefs,
  listElement: listRef,
  registerItem,
  unregisterItem,
})
</script>

<template>
  <Primitive
    ref="listRef"
    data-slot="toc-list"
    v-bind="forwardedProps"
    :class="tocList({
      class: normalizeClass(props.class),
    })"
  >
    <slot />
  </Primitive>
</template>
