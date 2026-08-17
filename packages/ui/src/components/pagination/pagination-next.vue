<script setup lang="ts">
import { Icon, iconsConfig } from '@nka/components/icon'
import { Link } from '@nka/components/link'
import { normalizeClass } from '@nka/utils/styling'
import { type PaginationNextProps, paginationVariants } from '.'

const props = defineProps<PaginationNextProps>()

const variants = paginationVariants()
</script>

<template>
  <Link
    data-slot="nka-pagination-next"
    rel="next"
    v-bind="props"
    :class="variants.next({
      class: normalizeClass(props.class)
    })"
  >
    <slot />
    <Icon :name="iconsConfig.chevronRight" />
  </Link>
</template>
