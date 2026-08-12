import { type Static, Type } from 'typebox'
import { ItemTypeSchema } from './type'

export const ItemNameSchema = Type.String({
  description: 'Item name.',
  pattern: '^[a-z][a-z0-9-]*$',
})

export type ItemName = Static<typeof ItemNameSchema>

export const ItemBaseSchema = Type.Object({
  name: ItemNameSchema,
  type: ItemTypeSchema,
})

export type ItemBase = Static<typeof ItemBaseSchema>
