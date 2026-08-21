<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { reactiveOmit, unrefElement, type UnRefElementReturn } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed, nextTick, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { injectScrollSpyRootContext } from './contexts'

export type ScrollSpyTargetProps = ClassProp & {
  /** Target ID. Also rendered as the element's `id` attribute. */
  id: string
}

export interface ScrollSpyTargetSlots {
  default?: (props: {
    /** Whether this target is currently active. */
    isActive: boolean
  }) => void
}
</script>

<script setup lang="ts">
defineSlots<ScrollSpyTargetSlots>()

const props = defineProps<ScrollSpyTargetProps>()
  
const delegatedProps = reactiveOmit(props, 'id')

const forwardedProps = useForwardProps(delegatedProps)

const scrollSpyRootContext = injectScrollSpyRootContext()

const targetRef = useTemplateRef('targetRef')

const isActive = computed(() => scrollSpyRootContext.activeId.value === props.id)

onMounted(async () => {
  await nextTick()

  const targetRefElement = unrefElement(targetRef) as Exclude<UnRefElementReturn, SVGElement>

  if (targetRefElement) {
    scrollSpyRootContext.registerTarget(props.id, targetRefElement)
  }
})

onBeforeUnmount(() => {
  scrollSpyRootContext.unregisterTarget(props.id)
})
</script>

<template>
  <Primitive
    :id="props.id"
    ref="targetRef"
    data-slot="scroll-spy-target"
    :data-active="isActive ? '' : undefined"
    v-bind="forwardedProps"
  >
    <slot :is-active />
  </Primitive>
</template>