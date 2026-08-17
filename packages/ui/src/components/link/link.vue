<script setup lang="ts">
import { normalizeClass } from '@nka/utils/styling'
import { type LinkProps, linkVariants } from '.'

const props = defineProps<LinkProps>()

const variants = linkVariants()
</script>

<template>
  <RouterLink
    v-bind="props"
    data-slot="link"
    :class="variants.root({
      class: normalizeClass(props.class),
    })"
  >
    <slot />
  </RouterLink>
</template>
