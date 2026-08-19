<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { tocVariants } from './variants'

export type TocRootProps = ClassProp & PrimitiveProps
</script>

<script setup lang="ts">
const props = defineProps<TocRootProps>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = tocVariants()
</script>

<template>
  <Primitive
    data-slot="toc-root"
    v-bind="forwardedProps"
    :class="variants.root({
      class: normalizeClass(props.class),
    })"
  >
    <slot />
  </Primitive>
</template>
