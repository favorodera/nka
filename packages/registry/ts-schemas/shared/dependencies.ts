import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './base'

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

const RegistryDependenciesSchema = Type.Object({
  name: ItemNameSchema,

  type: Type.Union([
    Type.Literal('component'),
    Type.Literal('utility'),
  ]),
})

export const DependenciesSchema = Type.Object({
  registry: Type.Optional(Type.Array(RegistryDependenciesSchema, {
    description: 'Component and utility registry dependencies.',
    uniqueItems: true,
  })),

  packages: Type.Optional(PackageDependenciesSchema),
})

export type Dependencies = Static<typeof DependenciesSchema>
