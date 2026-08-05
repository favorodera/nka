import { type Static, Type } from 'typebox'
import { RegistryItemReferenceSchema } from './shared/reference'
import { RegistryRepositorySchema } from './shared/repository'

export const TemplateSchema = Type.Intersect([
  RegistryItemReferenceSchema,
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
