import type { ClassProp } from '@nka/utils/props'
import { cn } from 'tailwind-variants'

/**
 * Normalizes class input to be used with Tailwind Variants' `cn` utility.
 * @param classInput The class input to normalize.
 * @returns The normalized class input.
 */
export function normalizeClass(classInput: ClassProp['class']) {
  return cn(classInput)
}
