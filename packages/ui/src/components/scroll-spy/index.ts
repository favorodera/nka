// Contexts
export { injectScrollSpyContext, provideScrollSpyContext } from './contexts'
export type { ScrollSpyContext, ScrollSpyOrientation } from './contexts'

// Composable
export { useScrollSpy } from './use-scroll-spy'
export type { UseScrollSpyOptions, UseScrollSpyReturn } from './use-scroll-spy'

// Components
export { default as ScrollSpyRoot } from './scroll-spy-root.vue'
export type { ScrollSpyRootProps, ScrollSpyRootSlot } from './scroll-spy-root.vue'

export { default as ScrollSpyTarget } from './scroll-spy-target.vue'
export type { ScrollSpyTargetProps, ScrollSpyTargetSlot } from './scroll-spy-target.vue'
