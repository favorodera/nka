import { type Static, Type } from 'typebox'
import { ItemBaseSchema } from './base'

const PackageNameSchema = Type.String({
  description: 'Package name.',
})

const VersionRangeSchema = Type.String({
  description: 'Package version range.',
})

export const PackageDependenciesSchema = Type.Record(
  PackageNameSchema,
  VersionRangeSchema,
  {
    description: 'Installable NPM packages.',
  },
)

export const DependenciesSchema = Type.Object({
  registry: Type.Optional(Type.Array(ItemBaseSchema, {
    description: 'Registry item dependencies.',
    uniqueItems: true,
  })),

  packages: Type.Optional(PackageDependenciesSchema),
})

export type Dependencies = Static<typeof DependenciesSchema>
export type PackageDependencies = Static<typeof PackageDependenciesSchema>
