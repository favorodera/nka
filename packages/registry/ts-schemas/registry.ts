import { type Static, Type } from 'typebox'
import { ItemSchema } from './item'
import { MetadataSchema } from './metadata'

export const RegistrySchema = Type.Object({
  $schema: Type.Optional(Type.String({
    description: 'JSON Schema reference.',
  })),
  items: Type.Array(ItemSchema, {
    description: 'Registry items.',
  }),
  metadata: MetadataSchema,
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Registry = Static<typeof RegistrySchema>
