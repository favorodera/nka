<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { tocVariants } from './variants'

export type TocListProps = ClassProp & PrimitiveProps
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<TocListProps>(), {
  as: 'ul',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = tocVariants()
</script>

<template>
  <Primitive
    data-slot="toc-list"
    v-bind="forwardedProps"
    :class="variants.list({
      class: normalizeClass(props.class),
    })"
  >
    <slot />
  </Primitive>
</template>
