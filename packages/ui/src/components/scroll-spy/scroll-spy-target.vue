<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import type { ScrollSpyTargetProps, ScrollSpyTargetSlot } from './types'
import { injectScrollSpyContext } from './contexts'

defineSlots<ScrollSpyTargetSlot>()

const props = defineProps<ScrollSpyTargetProps>()

const delegatedProps = reactiveOmit(props, 'class', 'id')

const forwardedProps = useForwardProps(delegatedProps)

const context = injectScrollSpyContext()

const targetRef = useTemplateRef<HTMLElement>('targetRef')

const isActive = computed(() => context.activeId.value === props.id)

onMounted(() => {
  const element = targetRef.value
  if (element) {
    context.register(props.id, element)
  }
})

onBeforeUnmount(() => {
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
