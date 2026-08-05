import { type Static, Type } from 'typebox'
import { ComponentSchema } from '../component'
import { TemplateSchema } from '../template'

export const RegistryItemSchema = Type.Union([
  ComponentSchema,
  TemplateSchema,
], {
  $id: 'RegistryItem',
  description: 'A single installable registry item.',
  title: 'Registry Item',
})

export type RegistryItem = Static<typeof RegistryItemSchema>
