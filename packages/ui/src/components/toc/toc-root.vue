<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import type { TocRootProps } from './types'
import { tocVariants } from './variants'

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
