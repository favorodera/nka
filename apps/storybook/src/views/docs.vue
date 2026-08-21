<script setup lang="ts">
import {
  PaginationContent,
  PaginationDescription,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
  PaginationTitle,
} from '@nka/components/pagination'
import { ScrollSpyRoot } from '@nka/components/scroll-spy'
import {
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocRoot,
  TocTitle,
} from '@nka/components/toc'
import { parseMarkdown } from 'comark'
import toc, { generateFlatToc, type Toc } from 'comark/plugins/toc'
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

const currentIndex = computed(() => orderedSlugs.indexOf(slug.value))
const prevSlug = computed(() => orderedSlugs[currentIndex.value - 1])
const nextSlug = computed(() => orderedSlugs[currentIndex.value + 1])

const content = ref('# Loading…')
const pageTocTree = ref<Toc>()
const prevMeta = ref<PageMeta>({})
const nextMeta = ref<PageMeta>({})

const pageTocIds = computed(() => {
  return pageTocTree.value?.links.map(link => link.id) || []
})

/**
 * Discovers and loads the raw content of a page.
 * @param key Page key
 * @returns Raw markdown content or null if page doesn't exist
 */
async function discoverPage(key: string | undefined) {
  if (!key || !Object.hasOwn(pages, key)) {
    return
  }

  return await pages[key]?.() ?? undefined
}

/**
 * Loads the metadata of a page.
 * @param key Page key
 * @returns Meta object
 */
async function loadMeta(key: string | undefined): Promise<PageMeta> {
  const raw = await discoverPage(key)
  if (!raw) return {}
  const doc = await parseMarkdown(raw)
  return doc.frontmatter as PageMeta
}

/**
 * Loads the TOC of the current page.
 * @param key Page key
 */
async function loadToc(key: string) {
  const raw = await discoverPage(key)

  if (!raw) {
    return
  }

  const doc = await parseMarkdown(raw, {
    plugins: [
      toc({
        depth: 5,
        searchDepth: 6,
      }),
    ],
  })
  
  pageTocTree.value = generateFlatToc(doc, doc.meta.toc)
}

/**
 * Loads the content of a page.
 * @param key Page key
 */
async function loadPage(key: string) {
  const raw = await discoverPage(key)
  if (!raw) {
    content.value = `# Page not found\n\nNo doc at \`/docs/${key}\`.`
    return
  }
  content.value = raw
}

watch(slug, loadPage, { immediate: true })
watch(slug, loadToc, { immediate: true })

watch(prevSlug, async (key) => {
  prevMeta.value = await loadMeta(key)
}, { immediate: true })

watch(nextSlug, async (key) => {
  nextMeta.value = await loadMeta(key)
}, { immediate: true })
</script>

<template>
  <DocsLayout>
    <ScrollSpyRoot
      :target-ids="pageTocIds"
      class="grid grid-cols-[1fr_auto] min-block-dvh"
    >
      <main
        class="
          mx-auto overflow-y-auto px-6 py-12 inline-full max-inline-4xl
          min-inline-0
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
          sticky inset-bs-0 hidden overflow-y-auto border-s p-6 inline-56
          max-block-dvh

          lg:block
        "
      >
        <TocRoot v-if="pageTocTree">
          <TocTitle />

          <TocList>
            <TocIndicator />

            <TocItem
              v-for="item in pageTocTree?.links"
              :id="item.id"
              :key="item.id"
              :depth="item.depth"
            >
              <TocLink>
                {{ item.text }}
              </TocLink>
            </TocItem>
          </TocList>
        </TocRoot>
      </aside>
    </ScrollSpyRoot>
  </DocsLayout>
</template>
