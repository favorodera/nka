<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit, unrefElement } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import { computed, useTemplateRef } from 'vue'
import type { TocIndicatorProps } from './types'
import { useTocIndicator } from './use-toc-indicator'
import { tocVariants } from './variants'

const props = defineProps<TocIndicatorProps>()

const delegatedProps = reactiveOmit(props, 'class', 'variant')
const forwardedProps = useForwardProps(delegatedProps)
const variants = tocVariants()

const indicatorElement = useTemplateRef('indicatorElement')

/**
 * Nearest TOC list that owns the links being tracked.
 * Both composables measure relative to this element.
 */
const listElement = computed(() => {
  const element = unrefElement(indicatorElement)
  return element?.closest<HTMLElement>('[data-slot="toc-list"]')
})


// Line geometry (only active work when variant is line — watchers still
// attach, but the DOM query is cheap when the list is empty).
const {
  isVisible: isLineVisible,
  style: lineStyle,
} = useTocIndicator(listElement)


const thumbStyle = computed(() => ({
  ...lineStyle.value,
  height: 'var(--toc-indicator-size)',
  opacity: isLineVisible.value ? 1 : 0,
  top: 'var(--toc-indicator-top)',
}))
</script>

<template>
  <Primitive
    ref="indicatorElement"
    data-slot="toc-indicator"
    aria-hidden="true"
    v-bind="forwardedProps"
    :class="variants.indicator({
      class: normalizeClass(props.class),
      indicator: props.variant,
    })"
  >
    <span
      data-slot="toc-indicator-track"
      :class="variants.indicatorTrack()"
    />

    <span
      data-slot="toc-indicator-thumb"
      :class="variants.indicatorThumb()"
      :style="thumbStyle"
    />
  </Primitive>
</template>
