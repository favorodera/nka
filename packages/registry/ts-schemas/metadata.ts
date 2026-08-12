import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './base'
import { PackageDependenciesSchema } from './dependencies'

/** Registry-wide dependencies — packages and utilities. */
export const MetadataDependenciesSchema = Type.Object({
  packages: Type.Optional(PackageDependenciesSchema),
  utilities: Type.Optional(Type.Array(ItemNameSchema, {
    description: 'Utilities installed with the registry.',
    uniqueItems: true,
  })),
})

export const MetadataSchema = Type.Object({
  baseUrl: Type.String({
    description: 'Base URL for resolving registry files.',
    format: 'uri',
  }),
  dependencies: Type.Optional(MetadataDependenciesSchema),
  name: Type.String({
    description: 'Registry name.',
    examples: [
      'nka',
      'julio-ui',
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
