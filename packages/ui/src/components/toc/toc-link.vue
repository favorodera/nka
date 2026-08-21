<script lang="ts">
import type { ClassProp } from '@nka/utils/props'
import { injectScrollSpyRootContext } from '@nka/components/scroll-spy'
import { normalizeClass } from '@nka/utils/styling'
import { reactiveOmit } from '@vueuse/core'
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui'
import { injectTocItemContext } from './contexts'
import { tocLink } from './variants'

export type TocLinkProps = ClassProp & PrimitiveProps
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<TocLinkProps>(), {
  as: 'a',
})

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const tocItemContext = injectTocItemContext()

const scrollSpyRootContext = injectScrollSpyRootContext()

/**
 * Handles clicks on the TOC link.
 * @param event The click event.
 */
function onClick(event: MouseEvent) {
  // Prevent default navigation and use scrollSpy.
  event.preventDefault()
  scrollSpyRootContext.scrollTo(tocItemContext.id)

  // Update URL hash for shareable links.
  if (typeof history !== 'undefined') {
    history.replaceState(history.state, '', tocItemContext.hash.value)
  }
}
</script>

<template>
  <Primitive
    data-slot="toc-link"
    :aria-current="tocItemContext.isActive.value ? 'location' : undefined"
    :href="tocItemContext.hash.value"
    :class="tocLink({
      class: normalizeClass(props.class),
    })"
    v-bind="forwardedProps"
    @click="onClick"
  >
    <slot />
  </Primitive>
</template>