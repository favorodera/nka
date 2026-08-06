import { type Static, Type } from 'typebox'
import { MetadataSchema } from './metadata'
import { RegistryItemReferenceSchema } from './shared/reference'

export const RegistrySchema = Type.Object({
  version: Type.String({
    description: 'Registry version.',
    examples: ['0.1.0'],
  }),

  items: Type.Array(RegistryItemReferenceSchema, {
    description: 'Registry item references.',
  }),

  metadata: Type.Optional(MetadataSchema),
}, {
  $id: 'Registry',
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  description: 'The root registry manifest.',
  title: 'Registry',
})

export type Registry = Static<typeof RegistrySchema>
