import { type Static, Type } from 'typebox'
import { RegistryDependenciesSchema } from './dependencies'
import { RegistryFileSchema } from './file'
import { RegistryItemSchema } from './item'

export const ComponentSchema = Type.Intersect([
  RegistryItemSchema,
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
