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
  useToc,
} from '@nka/components/toc'
import { parseMarkdown } from 'comark'
import { computed, ref, useTemplateRef, watch } from 'vue'
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

const mainRef = useTemplateRef('mainRef')

const { ids: tocIds, items: tocItems } = useToc(mainRef)
</script>

<template>
  <DocsLayout>
    <ScrollSpyRoot
      :ids="tocIds"
      :offset="80"
      class="grid grid-cols-[1fr_auto] min-block-dvh"
    >
      <main
        ref="mainRef"
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
        <TocRoot v-if="tocItems.length > 0">
          <TocTitle />

          <TocList>
            <TocIndicator />

            <TocItem
              v-for="item in tocItems"
              :id="item.id"
              :key="item.id"
              :depth="item.depth"
            >
              <TocLink>
                {{ item.label }}
              </TocLink>

              <TocList v-if="item.children">
                <TocItem
                  v-for="subItem in item.children"
                  :id="subItem.id"
                  :key="subItem.id"
                  :depth="subItem.depth"
                >
                  <TocLink>
                    {{ subItem.label }}
                  </TocLink>
                </TocItem>
              </TocList>
            </TocItem>
          </TocList>
        </TocRoot>
      </aside>
    </ScrollSpyRoot>
  </DocsLayout>
</template>
