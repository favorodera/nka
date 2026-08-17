<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { type PaginationTitleProps, paginationVariants } from '.'

const props = defineProps<PaginationTitleProps>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = paginationVariants()
</script>

<template>
  <Primitive
    data-slot="nka-pagination-title"
    v-bind="forwardedProps"
    :class="variants.title({
      class: normalizeClass(props.class)
    })"
  >
    <slot />
  </Primitive>
</template>
