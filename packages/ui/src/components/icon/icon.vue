<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { normalizeClass } from '@nka/utils/styling'
import { type IconProps, iconVariants } from '.'

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
