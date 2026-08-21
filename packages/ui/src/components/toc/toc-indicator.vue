<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { useElementBounding } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { injectTocListContext } from './contexts'
import { tocIndicator } from './variants'

export type TocIndicatorProps = ClassProp
</script>

<script setup lang="ts">
const props = defineProps<TocIndicatorProps>()

const tocListContext = injectTocListContext()

const activeElement = ref<HTMLElement>()

watch(
  tocListContext.activeId,
  (id) => {
    activeElement.value = id ? tocListContext.itemRefs.value.get(id) : undefined
  },
  {
    immediate: true,
  },
)

const activeElementBounding = useElementBounding(activeElement)

const listElementBounding = useElementBounding(tocListContext.listElement)

const isVisible = computed(() => !!activeElement.value)

const thumbOffset = computed(() => activeElementBounding.top.value - listElementBounding.top.value)

const variant = tocIndicator()
</script>

<template>
  <span
    aria-hidden="true"
    data-slot="toc-indicator"
    :class="variant.root({
      class: normalizeClass(props.class) 
    })"
  >
    <span
      data-slot="toc-indicator-track"
      :class="variant.track()"
    />

    <span
      v-if="isVisible"
      data-slot="toc-indicator-thumb"
      :class="variant.thumb()"
      :style="{
        height: `${activeElementBounding.height.value}px`,
        transform: `translateY(${thumbOffset}px)`,
      }"
    />
  </span>
</template>
