// Contexts
export {
  injectScrollSpyRootContext,
  provideScrollSpyRootContext,
  type ScrollSpyRootContext,
} from './contexts'

// Composable
export {
  useScrollSpy,
  type UseScrollSpyOptions,
  type UseScrollSpyReturn,
} from './use-scroll-spy'

// Components
export {
  default as ScrollSpyRoot,
  type ScrollSpyRootProps,
  type ScrollSpyRootSlots,
} from './scroll-spy-root.vue'

export {
  default as ScrollSpyTarget,
  type ScrollSpyTargetProps,
  type ScrollSpyTargetSlots,
} from './scroll-spy-target.vue'