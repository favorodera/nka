<script setup lang="ts">
import { injectScrollSpyContext } from '@nka/components/scroll-spy'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import type { TocItemProps } from './types'
import { provideTocItemContext } from './contexts'
import { tocVariants } from './variants'

const props = withDefaults(defineProps<TocItemProps>(), {
  as: 'li',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = tocVariants()

const scrollSpyContext = injectScrollSpyContext()

const isActive = computed(() => props.id === scrollSpyContext?.activeId.value)
const dataActive = computed(() => (isActive.value ? '' : undefined))
const ariaCurrent = computed(() => (isActive.value ? 'true' : undefined))
const hash = computed(() => `#${props.id}`)

provideTocItemContext({
  ariaCurrent,
  dataActive,
  depth: props.depth,
  hash,
  id: props.id,
  isActive,
  scroll: () => scrollSpyContext.scrollTo(props.id),
})
</script>

<template>
  <Primitive
    data-slot="toc-item"
    :data-depth="props.depth"
    :data-id="props.id"
    :data-active="dataActive"
    v-bind="forwardedProps"
    :class="variants.item({
      class: normalizeClass(props.class),
    })"
  >
    <slot />
  </Primitive>
</template>
