import { type Static, Type } from 'typebox'
import { ItemNameSchema } from './base'

const PackageNameSchema = Type.String({ description: 'Package name.' })
const VersionRangeSchema = Type.String({ description: 'Version range.' })

export const PackageDependenciesSchema = Type.Record(
  PackageNameSchema,
  VersionRangeSchema,
  { description: 'NPM packages.' },
)

const RegistryDependenciesSchema = Type.Object({
  name: ItemNameSchema,
  type: Type.Union([
    Type.Literal('component'),
    Type.Literal('utility'),
  ]),
})

export const DependenciesSchema = Type.Object({
  packages: Type.Optional(PackageDependenciesSchema),
  registry: Type.Optional(Type.Array(RegistryDependenciesSchema, {
    description: 'Registry item dependencies.',
    uniqueItems: true,
  })),
})

export type Dependencies = Static<typeof DependenciesSchema>
