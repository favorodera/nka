<script setup lang="ts">
import index from 'content/index.md?raw'
import Comark from '@/components/comark.vue'
</script>

<template>
  <main class="min-block-dvh">
    <div class="mx-auto px-6 py-16 max-inline-3xl">
      <Comark
        :content="index"
      />
    </div>
  </main>
</template>
