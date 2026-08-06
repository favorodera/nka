import { type Static, Type } from 'typebox'
import { NPMSchema } from './shared/dependencies'

export const MetadataSchema = Type.Object({
  npm: Type.Optional(NPMSchema),
}, {
  $id: 'RegistryMetadata',
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  description: 'Global installation metadata shared by all registry items.',
  title: 'Registry Metadata',
})

export type Metadata = Static<typeof MetadataSchema>
