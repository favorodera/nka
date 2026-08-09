import { type Static, Type } from 'typebox'

export const ItemNameSchema = Type.String({
  description: 'Unique registry item name.',
  examples: [
    'button',
    'docs-default',
  ],
  pattern: '^[a-z][a-z0-9-]*$',
})

export const ItemTypeSchema = Type.Union(
  [
    Type.Literal('component'),
    Type.Literal('template'),
    Type.Literal('utility'),
  ],
  {
    description: 'Type of registry item.',
    examples: [
      'component',
      'template',
      'utility',
    ],
  },
)

export const ItemBaseSchema = Type.Object({
  name: ItemNameSchema,
  type: ItemTypeSchema,
})

export type ItemBase = Static<typeof ItemBaseSchema>