<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import type { TocListProps } from './types'
import { tocVariants } from './variants'

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
