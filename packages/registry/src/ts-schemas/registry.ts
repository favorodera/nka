import { type Static, Type } from 'typebox'
import { RegistryItemSchema } from './shared/item'

export const RegistrySchema = Type.Object({
  items: Type.Array(
    RegistryItemSchema,
    {
      description: 'Registry items.',
    },
  ),
}, {
  $id: 'Registry',
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  description: 'The root registry manifest.',
  title: 'Registry',
})

export type Registry = Static<typeof RegistrySchema>
