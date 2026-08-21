<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { tocTitle } from './variants'

export type TocTitleProps = ClassProp & PrimitiveProps
</script>

<script setup lang="ts">
const props = defineProps<TocTitleProps>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <Primitive
    data-slot="toc-title"
    v-bind="forwardedProps"
    :class="tocTitle({
      class: normalizeClass(props.class),
    })"
  >
    <slot>
      On this page
    </slot>
  </Primitive>
</template>
