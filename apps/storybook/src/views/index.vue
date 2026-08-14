<script lang="ts">
import index from 'content/index.md?raw'
</script>

<script setup lang="ts">
import Comark from '@/components/comark.vue'
</script>

<template>
  <main>
    <Suspense>
      <Comark
        :content="index"
        class="block prose prose-docs mx-auto p-4 max-inline-4xl"
      />
    </Suspense>
  </main>
</template>
