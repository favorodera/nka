<script setup lang="ts">
import { Markdown } from '@comark/vue'
import footnotes from '@comark/vue/plugins/footnotes'
import highlight from '@comark/vue/plugins/highlight'
import math, { Math } from '@comark/vue/plugins/math'
import { ProsePre } from '@nka/components/prose-pre'
import bash from '@shikijs/langs/bash'
import diff from '@shikijs/langs/diff'
import javascript from '@shikijs/langs/javascript'
import json from '@shikijs/langs/json'
import mermaidLang from '@shikijs/langs/mermaid'
import typescript from '@shikijs/langs/typescript'
import vue from '@shikijs/langs/vue'
import lightTheme from '@shikijs/themes/catppuccin-latte'
import darkTheme from '@shikijs/themes/catppuccin-mocha'
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import emoji from 'comark/plugins/emoji'
import frontmatter from 'comark/plugins/frontmatter'
import taskList from 'comark/plugins/task-list'
import 'katex/dist/katex.min.css'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  content: string
}>()

const plugins = [
  taskList(),
  highlight({
    languages: [
      javascript,
      typescript,
      vue,
      json,
      diff,
      bash,
      mermaidLang,
    ],
    registerDefaultLanguages: false,
    registerDefaultThemes: false,
    themes: {
      dark: darkTheme,
      light: lightTheme,
    },
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationFocus(),
    ],
  }),
  emoji(),
  footnotes({
    hr: false,
    label: 'References',
  }),
  math(),
  frontmatter(),
]

const components = {
  math: Math,
  ProsePre,
}
</script>

<template>
  <Suspense>
    <Markdown
      :plugins="plugins"
      :components="components"
      class="prose-docs prose"
      v-bind="$attrs"
    >
      {{ $props.content }}
    </Markdown>
  </Suspense>
</template>

<style lang="css">
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
</style>
