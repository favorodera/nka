<script setup lang="ts">
import { type HeadingsProps, headingsVariants } from '.'
import { normalizeClass } from '../../utils/styling'

const props = defineProps<HeadingsProps>()

const variants = headingsVariants()
</script>

<template>
  <h1
    :class="variants.root({
      level: 1,
      class: normalizeClass(props.class)
    })"
    data-slot="heading-h1"
  >
    <slot />
  </h1>
</template>
