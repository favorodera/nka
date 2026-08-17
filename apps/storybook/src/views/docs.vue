<script setup lang="ts">
import {
  PaginationContent,
  PaginationDescription,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
  PaginationTitle,
} from '@nka/components/pagination'
import { parseMarkdown } from 'comark'
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

const orderedSlugs = Object.keys(pages).toSorted((a, b) => a.localeCompare(b))

interface PageMeta {
  description?: string
  title?: string
}

const route = useRoute()

const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? param.join('/') : (param ?? '')
})

const content = ref('# Loading…')
const prevMeta = ref<PageMeta>({})
const nextMeta = ref<PageMeta>({})

const currentIndex = computed(() => orderedSlugs.indexOf(slug.value))
const prevSlug = computed(() => orderedSlugs[currentIndex.value - 1])
const nextSlug = computed(() => orderedSlugs[currentIndex.value + 1])

/**
 * Loads the metadata of a page.
 * @param key Page key
 * @returns Meta object
 */
async function loadMeta(key: string | undefined): Promise<PageMeta> {
  if (!key || !Object.hasOwn(pages, key)) return {}
  const raw = await pages[key]?.()
  const doc = await parseMarkdown(raw ?? '')
  return doc.frontmatter as PageMeta
}

/**
 * Loads the content of a page.
 * @param key Page key
 */
async function loadPage(key: string) {
  const loader = pages[key]
  if (!loader) {
    content.value = `# Page not found\n\nNo doc at \`/docs/${key}\`.`
    return
  }
  content.value = await loader()
}

watch(slug, loadPage, { immediate: true })
watch(prevSlug, async (key) => {
  prevMeta.value = await loadMeta(key)
}, { immediate: true })
watch(nextSlug, async (key) => {
  nextMeta.value = await loadMeta(key)
}, { immediate: true })
</script>

<template>
  <DocsLayout>
    <div class="grid grid-cols-[1fr_auto] min-block-dvh">
      <main
        class="
          mx-auto overflow-y-auto px-6 inline-full max-inline-4xl min-inline-0
        "
      >
        <Suspense>
          <Comark :content="content" />
        </Suspense>

        <PaginationRoot class="mbs-16">
          <PaginationPrev
            v-if="prevSlug"
            :to="`/docs/${prevSlug}`"
          >
            <PaginationContent>
              <PaginationTitle>
                {{ prevMeta.title }}
              </PaginationTitle>

              <PaginationDescription>
                {{ prevMeta.description }}
              </PaginationDescription>
            </PaginationContent>
          </PaginationPrev>

          <PaginationNext
            v-if="nextSlug"
            :to="`/docs/${nextSlug}`"
          >
            <PaginationContent>
              <PaginationTitle>
                {{ nextMeta.title }}
              </PaginationTitle>

              <PaginationDescription>
                {{ nextMeta.description }}
              </PaginationDescription>
            </PaginationContent>
          </PaginationNext>
        </PaginationRoot>
      </main>

      <aside
        class="
          sticky inset-bs-0 hidden overflow-y-auto border-s p-6 block-dvh
          inline-56

          lg:block
        "
      >
        <!-- TODO: Add On this page TOC-->
      </aside>
    </div>
  </DocsLayout>
</template>
