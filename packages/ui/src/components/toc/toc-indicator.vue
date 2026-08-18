<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import type { TocIndicatorProps } from './types';
import { tocVariants } from './variants';

const props = defineProps<TocIndicatorProps>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = tocVariants()
</script>

<template>
  <Primitive
    data-slot="toc-indicator"
    v-bind="forwardedProps"
    :class="variants.indicator({
      class: normalizeClass(props.class),
    })"
  >
    <slot />
  </Primitive>
</template>
