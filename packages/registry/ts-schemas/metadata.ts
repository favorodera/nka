import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './shared/base'
import { PackageDependenciesSchema } from './shared/dependencies'

export const MetadataSchema = Type.Object({
  baseUrl: Type.String({
    description: 'Base URL used to resolve files in the registry.',
    format: 'uri',
  }),

  version: Type.String({
    description: 'Registry format version.',
    examples: ['0.1.0'],
  }),

  dependencies: Type.Optional(Type.Object(
    {
      packages: Type.Optional(PackageDependenciesSchema),

      utilities: Type.Optional(Type.Array(ItemNameSchema, {
        description: 'Utilities required by the registry.',
        uniqueItems: true,
      })),
    },
    {
      description: 'Dependencies required by the whole registry.',
    },
  )),

  name: Type.String({
    description: 'Name of the registry.',
    examples: [
      'julio-ui',
      'acme-ui',
    ],
    pattern: '^[a-z][a-z0-9-]*$',
  }),
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Metadata = Static<typeof MetadataSchema>
