<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, useForwardProps } from 'reka-ui'
import type { TocLinkProps } from './types'
import { injectTocItemContext } from './contexts'
import { tocVariants } from './variants'

const props = withDefaults(defineProps<TocLinkProps>(), {
  as: 'a',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = tocVariants()

const tocItemContext = injectTocItemContext()

/**
 * Handles clicks on the TOC link, preventing default navigation and scrolling to the target.
 * @param event The click event.
 */
function onClick(event: MouseEvent) {
  // Enhance native navigation with offset-aware smooth scrolling
  event.preventDefault()
  tocItemContext.scroll()

  // Keep URL hash in sync for shareable links / browser history
  if (typeof history !== 'undefined') {
    history.pushState(undefined, '', tocItemContext.hash.value)
  }
}
</script>

<template>
  <Primitive
    data-slot="toc-link"
    :data-active="tocItemContext.dataActive.value"
    :aria-current="tocItemContext.ariaCurrent.value"
    :href="tocItemContext.hash.value"
    :class="variants.link({
      class: normalizeClass(props.class),
    })"
    v-bind="forwardedProps"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>
