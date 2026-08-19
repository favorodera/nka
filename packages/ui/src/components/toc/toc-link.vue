<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { injectTocItemContext } from './contexts'
import { tocVariants } from './variants'

export type TocLinkProps = ClassProp & PrimitiveProps
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<TocLinkProps>(), {
  as: 'a',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const variants = tocVariants()

const tocItemContext = injectTocItemContext()

/**
 * Handles clicks on the TOC link.
 * @param event The click event.
 */
function onClick(event: MouseEvent) {
  // Prevent default navigation and use scrollSpy.
  event.preventDefault()
  tocItemContext.scroll()

  // Update URL hash for shareable links.
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
