<script setup lang="ts">
import { Button } from '@nka/components/button'
import { CodeIcon } from '@nka/components/code-icon'
import { Icon, iconsConfig } from '@nka/components/icon'
import { normalizeClass } from '@nka/utils/styling'
import { useClipboard } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { type ProsePreProps, prosePreVariants } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ProsePreProps>(), {
  copy: true,
  highlights: () => [],
  language: 'plaintext',
})

const prosePreCodeRef = useTemplateRef('prosePreCodeRef')

const { copied, copy: copyToClipboard } = useClipboard({
  legacy: true,
})

/** Copies the code to the clipboard. */
function copyCode() {
  const code = props.code ?? prosePreCodeRef.value?.textContent ?? ''

  copyToClipboard(code)
}

const variants = prosePreVariants()
</script>

<template>
  <figure
    :data-lang="props.language"
    data-slot="prose-pre-root"
    :class="variants.root()"
  >
    <figcaption
      v-if="props.filename"
      data-slot="prose-pre-header"
      :class="variants.header()"
    >
      <CodeIcon
        :filename="props.filename"
        :name="props.icon"
      />

      <span>{{ props.filename }}</span>
    </figcaption>

    <Button
      v-if="props.copy"
      variant="outline"
      :square="true"
      data-slot="prose-pre-copy"
      size="sm"
      :aria-label="copied ? 'Code copied successfully!' : 'Copy code to clipboard'"
      :class="variants.copy({
        copy:props.copy
      })"
      @click="copyCode"
    >
      <icon :name="copied ? iconsConfig.check : iconsConfig.clipboard " />
    </Button>

    <pre
      ref="prosePreCodeRef"
      data-slot="prose-pre-code"
      v-bind="$attrs"
      :class="variants.code({
        class: normalizeClass(props.class)
      })"
    ><slot /></pre>
  </figure>
</template>
