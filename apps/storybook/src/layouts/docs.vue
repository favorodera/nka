<template>
  <div
    class="
      grid grid-cols-1 min-block-dvh

      lg:grid-cols-[auto_1fr_auto]
    "
  >
    <aside
      class="
        sticky inset-bs-0 hidden overflow-y-auto border-e border-nka-border p-6
        block-dvh inline-64

        lg:block
      "
    >
      <!-- TODO: Add docs sidebar -->
    </aside>

    <slot />
  </div>
</template>
