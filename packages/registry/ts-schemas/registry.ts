import { type Static, Type } from 'typebox'
import { MetadataSchema } from './metadata'
import { ItemBaseSchema } from './shared/base'

export const RegistrySchema = Type.Object({
  items: Type.Array(ItemBaseSchema, {
    description: 'Registry items.',
  }),

  metadata: Type.Optional(MetadataSchema),
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Registry = Static<typeof RegistrySchema>
