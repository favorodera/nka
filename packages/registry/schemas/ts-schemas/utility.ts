import { type Static, Type } from 'typebox'
import { RegistryDependenciesSchema } from './shared/dependencies'
import { RegistryFileSchema } from './shared/file'
import { RegistryItemReferenceSchema } from './shared/reference'

export const UtilitySchema = Type.Intersect([
  RegistryItemReferenceSchema,
  Type.Object({
    type: Type.Literal('utility', {
      description: 'The registry item type, restricted to utility.',
    }),

    files: Type.Array(RegistryFileSchema, {
      description: 'Files associated with the utility.',
      minItems: 1,
    }),

    dependencies: Type.Optional(RegistryDependenciesSchema),
  }),
], {
  $id: 'Utility',
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  description: 'A utility registry item.',
  title: 'Utility',
})

export type Utility = Static<typeof UtilitySchema>
