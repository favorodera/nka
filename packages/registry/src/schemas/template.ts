import { type Static, Type } from 'typebox'

import { RegistryItemSchema } from './item'
import { RegistryRepositorySchema } from './repository'

export const TemplateSchema = Type.Intersect([
  RegistryItemSchema,
  Type.Object({
    type: Type.Literal('template', {
      description: 'The registry item type, restricted to template.',
    }),

    repository: RegistryRepositorySchema,
  }),
], {
  $id: 'Template',
  description: 'A template registry item.',
  title: 'Template',
})

export type Template = Static<typeof TemplateSchema>
