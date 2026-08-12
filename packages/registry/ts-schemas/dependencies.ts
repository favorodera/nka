import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './base'

export const PackageDependenciesSchema = Type.Record(
  Type.String({ description: 'Package name.' }),
  Type.String({ description: 'Version range.' }),
  { description: 'NPM packages.' },
)

export type PackageDependencies = Static<typeof PackageDependenciesSchema>

/** Full dependency set — packages, components, and utilities. */
export const DependenciesSchema = Type.Object({
  components: Type.Optional(Type.Array(ItemNameSchema, {
    description: 'Component dependencies.',
    uniqueItems: true,
  })),
  packages: Type.Optional(PackageDependenciesSchema),
  utilities: Type.Optional(Type.Array(ItemNameSchema, {
    description: 'Utility dependencies.',
    uniqueItems: true,
  })),
})

export type Dependencies = Static<typeof DependenciesSchema>
