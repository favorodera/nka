<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { type PaginationRootProps, paginationVariants } from '.'

const props = withDefaults(defineProps<PaginationRootProps>(), {
  as: 'nav',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = paginationVariants()
</script>

<template>
  <Primitive
    data-slot="nka-pagination-root"
    data-not-prose="true"
    aria-label="Pagination"
    v-bind="forwardedProps"
    :class="variants.root({
      class: normalizeClass(props.class)
    })"
  >
    <slot />
  </Primitive>
</template>
