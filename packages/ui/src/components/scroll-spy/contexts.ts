import { createContext } from 'reka-ui'
import type { ScrollSpyContext } from './types'

export const [injectScrollSpyContext, provideScrollSpyContext] = createContext<ScrollSpyContext>('ScrollSpyRoot')
