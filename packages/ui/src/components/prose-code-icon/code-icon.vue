<script setup lang="ts">
import { Icon } from '@nka/components/icon'
import { normalizeClass } from '@nka/utils/styling'
import { computed } from 'vue'
import { type CodeIconProps, codeIconVariants, resolveIconFromFilename } from '.'

const props = defineProps<CodeIconProps>()

const resolvedIcon = computed(() => {
  if (props.name) {
    return props.name
  }

  return resolveIconFromFilename(props.filename)
})

const variants = codeIconVariants()
</script>

<template>
  <Icon
    v-if="resolvedIcon"
    data-slot="code-icon"
    :name="resolvedIcon"
    :class="variants.root({
      class: normalizeClass(props.class)
    })"
  />
</template>
