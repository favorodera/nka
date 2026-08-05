import { type Static, Type } from 'typebox'
import { RegistryItemTypeSchema } from './type'

export const RegistryItemSchema = Type.Object({
  name: Type.String({
    description: 'Unique registry item identifier.',
    examples: [
      'alert',
      'button',
      'code-group',
    ],
    pattern: '^[a-z][a-z0-9-]*$',
  }),

  type: RegistryItemTypeSchema,
}, {
  $id: 'RegistryItem',
  description: 'Common properties shared by all registry items.',
  title: 'Registry Item',
})

export type RegistryItem = Static<typeof RegistryItemSchema>
