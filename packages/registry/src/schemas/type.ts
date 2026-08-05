import { type Static, Type } from 'typebox'

export const RegistryItemTypeSchema = Type.Union([
  Type.Literal('component'),
  Type.Literal('utility'),
  Type.Literal('template'),
], {
  $id: 'RegistryItemType',
  description: 'Supported registry item types.',
  title: 'Registry Item Type',
})

export type RegistryItemType = Static<typeof RegistryItemTypeSchema>
