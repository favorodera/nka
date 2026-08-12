import { type Static, Type } from 'typebox'
import { ItemBaseSchema } from './shared/base'
import { DependenciesSchema } from './shared/dependencies'
import { FileSchema } from './shared/file'

export const UtilitySchema = Type.Intersect([
  ItemBaseSchema,
  Type.Object({
    dependencies: Type.Optional(DependenciesSchema),
    files: Type.Array(FileSchema, {
      description: 'Utility files.',
      minItems: 1,
    }),
    type: Type.Literal('utility'),
  }),
], {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Utility = Static<typeof UtilitySchema>
