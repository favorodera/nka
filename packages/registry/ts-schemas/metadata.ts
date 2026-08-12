import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './shared/base'
import { PackageDependenciesSchema } from './shared/dependencies'

export const MetadataSchema = Type.Object({
  baseUrl: Type.String({
    description: 'Base URL for resolving registry files.',
    format: 'uri',
  }),
  dependencies: Type.Optional(Type.Object(
    {
      packages: Type.Optional(PackageDependenciesSchema),
      utilities: Type.Optional(Type.Array(ItemNameSchema, {
        description: 'Required utilities.',
        uniqueItems: true,
      })),
    },
    { description: 'Registry-wide dependencies.' },
  )),
  name: Type.String({
    description: 'Registry name.',
    examples: [
      'julio-ui',
      'acme-ui',
    ],
    pattern: '^[a-z][a-z0-9-]*$',
  }),
  version: Type.String({
    description: 'Registry format version.',
    examples: ['0.1.0'],
  }),
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Metadata = Static<typeof MetadataSchema>
