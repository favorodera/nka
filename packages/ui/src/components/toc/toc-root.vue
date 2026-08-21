<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { tocRoot } from './variants'

export type TocRootProps = ClassProp & PrimitiveProps
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<TocRootProps>(), {
  as: 'nav',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <Primitive
    data-slot="toc-root"
    v-bind="forwardedProps"
    :class="tocRoot({
      class: normalizeClass(props.class),
    })"
  >
    <slot />
  </Primitive>
</template>
