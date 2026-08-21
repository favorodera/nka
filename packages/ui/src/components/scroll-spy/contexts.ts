import { createContext } from 'reka-ui'
import type { UseScrollSpyReturn } from './use-scroll-spy'

/** Shared Context provided by the `ScrollSpyRoot` component to its children. */
export type ScrollSpyRootContext = UseScrollSpyReturn

export const [injectScrollSpyRootContext, provideScrollSpyRootContext] = createContext<ScrollSpyRootContext>('ScrollSpyRoot')