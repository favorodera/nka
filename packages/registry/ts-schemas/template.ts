import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './base'
import { FileSchema } from './file'

/** Template — no dependencies. */
export const TemplateSchema = Type.Object({
  files: Type.Array(FileSchema, {
    description: 'Template files.',
    minItems: 1,
    uniqueItems: true,
  }),
  name: ItemNameSchema,
  type: Type.Literal('template'),
}, {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
})

export type Template = Static<typeof TemplateSchema>
