import { type Static, Type } from 'typebox'
import { MetadataSchema } from './metadata'
import { ItemSchema } from './shared/item'

export const RegistrySchema = Type.Object({
  items: Type.Array(ItemSchema, {
    description: 'Registry items.',
  }),
  metadata: MetadataSchema,
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Registry = Static<typeof RegistrySchema>
