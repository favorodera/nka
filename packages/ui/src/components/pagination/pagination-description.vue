<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { type PaginationDescriptionProps, paginationVariants } from '.'

const props = withDefaults(defineProps<PaginationDescriptionProps>(), {
  as: 'p',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = paginationVariants()
</script>

<template>
  <Primitive
    data-slot="nka-pagination-description"
    v-bind="forwardedProps"
    :class="variants.description({
      class: normalizeClass(props.class)
    })"
  >
    <slot />
  </Primitive>
</template>
