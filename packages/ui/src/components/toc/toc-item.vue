<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { injectScrollSpyContext } from '@nka/components/scroll-spy'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import type { TocItem } from './use-toc'
import { provideTocItemContext } from './contexts'
import { tocVariants } from './variants'

export type TocItemProps = ClassProp & Pick<TocItem, 'depth' | 'id'> & PrimitiveProps
</script>

<script setup lang="ts">
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
