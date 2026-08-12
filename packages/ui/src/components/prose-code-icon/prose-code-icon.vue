<script setup lang="ts">
import { Icon } from '@nka/components/icon'
import { normalizeClass } from '@nka/utils/styling'
import { computed } from 'vue'
import { type ProseCodeIconProps, proseCodeIconVariants, resolveIconFromFilename } from '.'

const props = defineProps<ProseCodeIconProps>()

const resolvedIcon = computed(() => {
  if (props.name) {
    return props.name
  }

  return resolveIconFromFilename(props.filename)
})

const variants = proseCodeIconVariants()
</script>

<template>
  <Icon
    v-if="resolvedIcon"
    data-not-prose="true"
    data-slot="nka-prose-code-icon"
    :name="resolvedIcon"
    :class="variants.root({
      class:normalizeClass(props.class)
    })"
  />
</template>
