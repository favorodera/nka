<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed, nextTick, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { injectScrollSpyContext } from './contexts'

export type ScrollSpyTargetProps = ClassProp & {
  /** Target ID, also used as `id` attribute for native anchors. */
  id: string
}

export interface ScrollSpyTargetSlot {
  default?: (props: {
    /** Whether this target is currently active. */
    isActive: boolean
  }) => void
}
</script>

<script setup lang="ts">
defineSlots<ScrollSpyTargetSlot>()

const props = defineProps<ScrollSpyTargetProps>()

const delegatedProps = reactiveOmit(props, 'class', 'id')

const forwardedProps = useForwardProps(delegatedProps)

const context = injectScrollSpyContext()

const targetRef = useTemplateRef<HTMLElement>('targetRef')

const isActive = computed(() => context.activeId.value === props.id)

onMounted(async () => {
  await nextTick()

  const element = targetRef.value

  if (element) {
    context.register(props.id, element)
  }
})

onBeforeUnmount(async () => {
  await nextTick()
  
  const element = targetRef.value
  
  if (element) {
    context.unregister(props.id, element)
  }
})
</script>

<template>
  <Primitive
    ref="targetRef"
    data-slot="scroll-spy-target"
    :data-active="isActive ? '' : undefined"
    v-bind="forwardedProps"
    :class="normalizeClass(props.class)"
  >
    <slot :is-active />
  </Primitive>
</template>
