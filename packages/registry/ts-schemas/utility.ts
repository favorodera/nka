import { type Static, Type } from 'typebox'
import { ItemBaseSchema } from './shared/base'
import { DependenciesSchema } from './shared/dependencies'
import { FileSchema } from './shared/file'

export const UtilitySchema = Type.Intersect([
  ItemBaseSchema,
  Type.Object({
    type: Type.Literal('utility'),

    files: Type.Array(FileSchema, {
      description: 'Files included with the utility.',
      minItems: 1,
    }),

    dependencies: Type.Optional(DependenciesSchema),
  }),
], {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Utility = Static<typeof UtilitySchema>
