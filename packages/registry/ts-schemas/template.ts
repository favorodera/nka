import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './base'
import { RepositorySchema } from './repository'

/** Template — no dependencies. */
export const TemplateSchema = Type.Object({
  name: ItemNameSchema,
  repository: RepositorySchema,
  type: Type.Literal('template'),
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Template = Static<typeof TemplateSchema>
