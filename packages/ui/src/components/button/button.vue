<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { type ButtonProps, buttonVariants } from '.'
import { normalizeClass } from '../../utils/styling'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  size: 'md',
  square: false,
  variant: 'outline',
})

const delegatedProps = reactiveOmit(props, 'class', 'variant', 'size', 'square')

const forwardedProps = useForwardProps(delegatedProps)

const variants = buttonVariants()
</script>

<template>
  <Primitive
    data-slot="nka-button"
    data-not-prose="true"
    :data-variant="variant"
    :data-size="size"
    v-bind="forwardedProps"
    :class="variants.root({
      class: normalizeClass(props.class),
      size: props.size,
      square: props.square,
      variant: props.variant,
    })"
  >
    <slot />
  </Primitive>
</template>
