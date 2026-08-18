<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import type { TocTitleProps } from './types'
import { tocVariants } from './variants'

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
