<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import type { ScrollSpyRootProps, ScrollSpyRootSlot } from './types'
import { useScrollSpy } from './use-scroll-spy'

defineSlots<ScrollSpyRootSlot>()

const props = withDefaults(defineProps<ScrollSpyRootProps>(), {
  behavior: 'smooth',
  offset: 0,
  orientation: 'vertical',
})

const delegatedProps = reactiveOmit(props, 'class', 'behavior', 'orientation', 'offset', 'container', 'ids')

const forwardedProps = useForwardProps(delegatedProps)

const { activeId, activeIndex, isActive, items, scrollTo } = useScrollSpy({
  get behavior() {
    return props.behavior
  },
  get container() {
    return props.container
  },
  get ids() {
    return props.ids
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
      :active-id="activeId"
      :active-index="activeIndex"
      :items="items"
      :scroll-to="scrollTo"
      :is-active="isActive"
    />
  </Primitive>
</template>
