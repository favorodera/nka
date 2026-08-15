<script setup lang="ts">
const links = [
  {
    path: '/docs/typography',
    title: 'Typography',
  },
  {
    path: '/docs/introduction',
    title: 'Introduction',
  },
  {
    path: '/docs/getting-started',
    title: 'Getting started',
  },
  {
    path: '/docs/configuration',
    title: 'Configuration',
  },
]
</script>

<template>
  <div class="flex min-block-dvh">
    <aside
      class="
        sticky inset-bs-0 shrink-0 overflow-y-auto border-e border-nka-border
        p-6 block-dvh inline-64
      "
    >
      <div class="mbe-8 font-semibold tracking-tight">
        Docs
      </div>

      <nav class="space-y-1 text-sm">
        <RouterLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="
            block rounded-sm px-2 py-1.5

            hover:bg-nka-muted
          "
          active-class="bg-nka-muted font-medium"
        >
          {{ link.title }}
        </RouterLink>
      </nav>
    </aside>

    <slot />
  </div>
</template>
