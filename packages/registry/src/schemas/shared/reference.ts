import { type Static, Type } from 'typebox'
import { RegistryItemTypeSchema } from './type'

export const RegistryItemReferenceSchema = Type.Object({
  name: Type.String({
    description: 'Unique registry item identifier.',
    examples: [
      'alert',
      'button',
      'docs-default',
    ],
    pattern: '^[a-z][a-z0-9-]*$',
  }),

  type: RegistryItemTypeSchema,
}, {
  $id: 'RegistryItemReference',
  description: 'A reference to a registry item.',
  title: 'Registry Item Reference',
})

export type RegistryItemReference = Static<typeof RegistryItemReferenceSchema>
