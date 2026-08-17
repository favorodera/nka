import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './base'
import { DependenciesSchema } from './dependencies'
import { FileSchema } from './file'

/** Utility — may depend on packages and other utilities only. */
export const UtilitySchema = Type.Object({
  dependencies: Type.Optional(Type.Pick(DependenciesSchema, [
    'packages',
    'utilities',
  ])),
  files: Type.Array(FileSchema, {
    description: 'Utility files.',
    minItems: 1,
    uniqueItems: true,
  }),
  name: ItemNameSchema,
  type: Type.Literal('utility'),
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Utility = Static<typeof UtilitySchema>
