<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { type IconProps, iconVariants } from '.'
import { normalizeClass } from '../../utils/styling';

const props = defineProps<IconProps>()

const variants = iconVariants()
</script>

<template>
  <Icon
    data-slot="nka-icon"
    v-bind="props"
    :class="variants.root({
      class: normalizeClass(props.class),
    })"
    :icon="name"
  />
</template>