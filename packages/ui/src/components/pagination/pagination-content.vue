<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { type PaginationContentProps, paginationVariants } from '.'

const props = defineProps<PaginationContentProps>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = paginationVariants()
</script>

<template>
  <Primitive
    data-slot="nka-pagination-content"
    v-bind="forwardedProps"
    :class="variants.content({
      class: normalizeClass(props.class)
    })"
  >
    <slot />
  </Primitive>
</template>
