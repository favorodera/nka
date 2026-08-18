<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import type { UnwrapRef } from 'vue'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { useScrollSpy, type UseScrollSpyOptions, type UseScrollSpyReturn } from './use-scroll-spy'

export type ScrollSpyRootProps = ClassProp & UseScrollSpyOptions

export interface ScrollSpyRootSlot {
  default?: (props: Pick<
  UnwrapRef<UseScrollSpyReturn>,
  'activeId' | 'activeIds' | 'activeIndex' | 'isActive' | 'items' | 'scrollTo'
  >) => void
}
</script>

<script setup lang="ts">
defineSlots<ScrollSpyRootSlot>()

const props = withDefaults(defineProps<ScrollSpyRootProps>(), {
  behavior: 'smooth',
  container: undefined,
  ids: undefined,
  mode: 'single',
  offset: 0,
  orientation: 'vertical',
})

const delegatedProps = reactiveOmit(
  props,
  'class',
  'behavior',
  'mode',
  'orientation',
  'offset',
  'container',
  'ids',
)

const forwardedProps = useForwardProps(delegatedProps)

const scrollSpy = useScrollSpy({
  get behavior() {
    return props.behavior
  },
  get container() {
    return props.container
  },
  get ids() {
    return props.ids
  },
  get mode() {
    return props.mode
  },
  get offset() {
    return props.offset
  },
  get orientation() {
    return props.orientation
  },
})
</script>

<template>
  <Primitive
    data-slot="scroll-spy-root"
    v-bind="forwardedProps"
    :class="normalizeClass(props.class)"
  >
    <slot
      :active-id="scrollSpy.activeId.value"
      :active-ids="scrollSpy.activeIds.value"
      :active-index="scrollSpy.activeIndex.value"
      :items="scrollSpy.items.value"
      :scroll-to="scrollSpy.scrollTo"
      :is-active="scrollSpy.isActive"
    />
  </Primitive>
</template>
