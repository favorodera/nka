import { createContext } from 'reka-ui'
import type { TocItemContext } from './types'

export const [injectTocItemContext, provideTocItemContext] = createContext<TocItemContext>('TocItem')
