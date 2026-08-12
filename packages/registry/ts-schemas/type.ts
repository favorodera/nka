import { type Static, Type } from 'typebox'

export const ItemTypeSchema = Type.Union([
  Type.Literal('component'),
  Type.Literal('utility'),
  Type.Literal('template'),
], {
  description: 'Registry item type.',
})

export type ItemType = Static<typeof ItemTypeSchema>
