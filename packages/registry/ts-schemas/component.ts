import { type Static, Type } from 'typebox'
import { ItemBaseSchema } from './shared/base'
import { DependenciesSchema } from './shared/dependencies'
import { FileSchema } from './shared/file'

export const ComponentSchema = Type.Intersect([
  ItemBaseSchema,
  Type.Object({
    type: Type.Literal('component'),

    files: Type.Array(FileSchema, {
      description: 'Files included with the component.',
      minItems: 1,
    }),

    dependencies: Type.Optional(DependenciesSchema),
  }),
], {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Component = Static<typeof ComponentSchema>
