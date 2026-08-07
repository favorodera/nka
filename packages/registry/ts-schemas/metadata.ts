import { type Static, Type } from 'typebox'
import { PackageDependenciesSchema } from './shared/dependencies'

export const MetadataSchema = Type.Object({
  source: Type.Object({
    baseUrl: Type.String({
      description: 'Base URL used to resolve files in the registry.',
      format: 'uri',
    }),
  }),

  version: Type.String({
    description: 'Registry format version.',
    examples: ['0.1.0'],
  }),

  packages: Type.Optional(PackageDependenciesSchema),
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Metadata = Static<typeof MetadataSchema>
