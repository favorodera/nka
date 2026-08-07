import { type Static, Type } from 'typebox'
import { ComponentSchema } from '../component'
import { TemplateSchema } from '../template'
import { UtilitySchema } from '../utility'

export const ItemSchema = Type.Union([
  ComponentSchema,
  TemplateSchema,
  UtilitySchema,
])

export type Item = Static<typeof ItemSchema>
