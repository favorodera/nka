import { type Static, Type } from 'typebox'
import { RegistryDependenciesSchema } from './shared/dependencies'
import { RegistryFileSchema } from './shared/file'
import { RegistryItemReferenceSchema } from './shared/reference'

export const ComponentSchema = Type.Intersect([
  RegistryItemReferenceSchema,
  Type.Object({
    type: Type.Literal('component', {
      description: 'The registry item type, restricted to component.',
    }),

    files: Type.Array(RegistryFileSchema, {
      description: 'Files associated with the component.',
      minItems: 1,
    }),

    dependencies: Type.Optional(RegistryDependenciesSchema),
  }),
], {
  $id: 'Component',
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  description: 'A component registry item.',
  title: 'Component',
})

export type Component = Static<typeof ComponentSchema>
