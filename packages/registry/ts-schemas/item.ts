import { type Static, Type } from 'typebox'
import { ComponentSchema } from './component'
import { UtilitySchema } from './utility'

export const ItemSchema = Type.Union([
  ComponentSchema,
  UtilitySchema,
])

export type Item = Static<typeof ItemSchema>
