import { type Static, Type } from 'typebox'
import { ItemBaseSchema } from './shared/base'
import { RepositorySchema } from './shared/repository'

export const TemplateSchema = Type.Intersect([
  ItemBaseSchema,
  Type.Object({
    repository: RepositorySchema,
    type: Type.Literal('template'),
  }),
], {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Template = Static<typeof TemplateSchema>
