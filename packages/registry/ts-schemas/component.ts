import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './base'
import { DependenciesSchema } from './dependencies'
import { FileSchema } from './file'

/** Component — may depend on packages, components, and utilities. */
export const ComponentSchema = Type.Object({
  dependencies: Type.Optional(DependenciesSchema),
  files: Type.Array(FileSchema, {
    description: 'Component files.',
    minItems: 1,
    uniqueItems: true,
  }),
  name: ItemNameSchema,
  type: Type.Literal('component'),
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Component = Static<typeof ComponentSchema>
