<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Comark from '@/components/comark.vue'
import DocsLayout from '@/layouts/docs.vue'

const contentModules = import.meta.glob('/content/docs/**/*.md', {
  import: 'default',
  query: '?raw',
}) as Record<string, () => Promise<string>>

const pages = Object.fromEntries(Object.entries(contentModules).map(([
  path,
  loader,
]) => [
  path.replace(/^\/content\/docs\//, '').replace(/\.md$/, ''),
  loader,
]))

const route = useRoute()

const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param.join('/') : (param ?? '')
})

const content = ref('# Loading…')

/**
 * loads the content of a markdown file from the `content/docs` directory.
 * @param key The key of the page to load.
 */
async function loadPage(key: string) {
  const loader = pages[key]

  content.value = loader
    ? await loader()
    : `# Page not found\n\nThere's no doc at \`/docs/${key}\` yet.`
}

watch(slug, loadPage, { immediate: true })
</script>

<template>
  <DocsLayout>
    <div class="flex flex-1 min-inline-0">
      <main class="flex-1 overflow-y-auto min-inline-0">
        <div class="mx-auto px-8 py-10 max-inline-3xl">
          <Comark
            :content="content"
          />
        </div>
      </main>

      <aside
        class="
          sticky inset-bs-0 hidden shrink-0 overflow-y-auto p-6 text-sm
          block-dvh inline-56

          xl:block
        "
      >
        <div class="mbe-3 font-medium text-nka-muted-foreground">
          On this page
        </div>
      </aside>
    </div>
  </DocsLayout>
</template>
