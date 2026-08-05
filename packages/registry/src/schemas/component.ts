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

    dependencies: RegistryDependenciesSchema,
  }),
], {
  $id: 'Component',
  description: 'A component registry item.',
  title: 'Component',
})

export type Component = Static<typeof ComponentSchema>
