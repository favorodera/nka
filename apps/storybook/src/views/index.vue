<script lang="ts">
import index from 'content/index.md?raw'
</script>

<script setup lang="ts">
import Comark from '@/components/comark.vue'
</script>

<template>
  <main>
    <Suspense>
      <div class="block mx-auto max-inline-4xl p-4">
        <Comark
          :content="index"
          class="prose prose-docs"
        />
      </div>
    </Suspense>
  </main>
</template>
