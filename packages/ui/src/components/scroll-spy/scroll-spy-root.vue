<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { provideScrollSpyRootContext } from './contexts'
import { useScrollSpy, useScrollSpyDefaultOptions, type UseScrollSpyOptions, type UseScrollSpyReturn } from './use-scroll-spy'

export type ScrollSpyRootProps = ClassProp & PrimitiveProps & UseScrollSpyOptions

export interface ScrollSpyRootSlots {
  default?: (props: {
    /** Currently active target ID. */
    activeId: UseScrollSpyReturn['activeId']['value']
  }) => void
}
</script>

<script lang="ts" setup>
defineSlots<ScrollSpyRootSlots>()

const props = withDefaults(defineProps<ScrollSpyRootProps>(), useScrollSpyDefaultOptions)

const delegatedProps = reactiveOmit(props, 'class', 'root', 'rootMargin', 'targetIds', 'threshold')

const forwardedProps = useForwardProps(delegatedProps)

const scrollSpy = useScrollSpy({
  get root() {
    return props.root
  },
  get rootMargin() {
    return props.rootMargin
  },
  get targetIds() {
    return props.targetIds
  },
  get threshold() {
    return props.threshold
  },
})

provideScrollSpyRootContext(scrollSpy)
</script>

<template>
  <Primitive
    data-slot="scroll-spy-root"
    v-bind="forwardedProps"
    :class="normalizeClass(props.class)"
  >
    <slot :active-id="scrollSpy.activeId.value" />
  </Primitive>
</template>
