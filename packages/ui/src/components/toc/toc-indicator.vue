<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { injectScrollSpyContext } from '@nka/components/scroll-spy'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit, unrefElement, useMutationObserver, useResizeObserver } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import {
  computed,
  type CSSProperties,
  nextTick,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from 'vue'
import { tocVariants } from './variants'

export type TocIndicatorProps = ClassProp & PrimitiveProps
</script>

<script setup lang="ts">
const props = defineProps<TocIndicatorProps>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
const variants = tocVariants()

const indicatorElement = useTemplateRef('indicatorElement')

/** Nearest TOC list that owns the links being tracked. */
const listElement = computed(() => {
  const element = unrefElement(indicatorElement)
  return element?.closest<HTMLElement>('[data-slot="toc-list"]')
})

const scrollSpy = injectScrollSpyContext()

const top = ref(0)
const size = ref(0)
const inset = ref(0)
const isVisible = ref(false)

const isMultipleMode = computed(() => scrollSpy?.activeIds.value.length > 1)

/** Re-measures the active item's geometry relative to the container. */
function measure() {
  const root = listElement.value
  let activeItem

  if (isMultipleMode.value) {
    // In multiple mode, find any active item.
    activeItem = root?.querySelector('[data-slot="toc-item"][data-active]')
  } else {
    // In single mode, only highlight the exact active item by ID.
    const activeId = scrollSpy?.activeId.value
    if (activeId) {
      const escapedId = CSS.escape(activeId)
      activeItem = root?.querySelector(`[data-slot="toc-item"][data-id="${CSS.escape(escapedId)}"]`)
    }
  }

  if (!root || !activeItem) {
    isVisible.value = false
    return
  }

  // Get the active link for inset calculation.
  const activeLink = activeItem.querySelector('[data-slot="toc-link"]') ?? activeItem

  const rootRect = root.getBoundingClientRect()
  const itemRect = activeItem.getBoundingClientRect()
  const linkRect = activeLink.getBoundingClientRect()

  inset.value = linkRect.left - rootRect.left
  size.value = itemRect.height
  top.value = itemRect.top - rootRect.top + root.scrollTop
  isVisible.value = true
}

/** Schedules a measurement on the next tick. */
function scheduleMeasurement() {
  void nextTick(measure)
}

watch(
  () => scrollSpy?.activeId.value,
  scheduleMeasurement,
  { flush: 'post' },
)

useResizeObserver(listElement, scheduleMeasurement)

useMutationObserver(listElement, scheduleMeasurement, {
  attributeFilter: ['data-active'],
  childList: true,
  subtree: true,
})

onMounted(scheduleMeasurement)

const lineStyle = computed<CSSProperties>(() => ({
  '--toc-indicator-inset': `${inset.value}px`,
  '--toc-indicator-size': `${size.value}px`,
  '--toc-indicator-top': `${top.value}px`,
}))

const thumbStyle = computed<CSSProperties>(() => ({
  ...lineStyle.value,
  height: 'var(--toc-indicator-size)',
  opacity: isVisible.value ? 1 : 0,
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
