<script setup lang="ts">
import { Icon, iconsConfig } from '@nka/components/icon'
import { Link } from '@nka/components/link'
import { normalizeClass } from '@nka/utils/styling'
import { type PaginationPrevProps, paginationVariants } from '.' 

const props = defineProps<PaginationPrevProps>()

const variants = paginationVariants()
</script>

<template>
  <Link
    data-slot="nka-pagination-prev"
    rel="prev"
    v-bind="props"
    :class="variants.prev({
      class: normalizeClass(props.class)
    })"
  >
    <Icon :name="iconsConfig.chevronLeft" />
    <slot />
  </Link>
</template>
