<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { tocVariants } from './variants'

export type TocTitleProps = ClassProp & PrimitiveProps
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<TocTitleProps>(), {
  as: 'p',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = tocVariants()
</script>

<template>
  <Primitive
    data-slot="toc-title"
    v-bind="forwardedProps"
    :class="variants.title({
      class: normalizeClass(props.class),
    })"
  >
    <slot>
      On this page
    </slot>
  </Primitive>
</template>
