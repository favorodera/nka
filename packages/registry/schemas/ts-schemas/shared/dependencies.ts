import { type Static, Type } from 'typebox'
import { RegistryItemReferenceSchema } from './reference'

const PackageName = Type.String({
  description: 'A valid npm package name.',
})

const VersionRange = Type.String({
  description: 'A valid npm version specifier.',
})

export const NPMSchema = Type.Partial(Type.Object({
  dependencies: Type.Record(PackageName, VersionRange),
  devDependencies: Type.Record(PackageName, VersionRange),
}))

export const RegistryDependenciesSchema = Type.Object({
  registry: Type.Optional(Type.Array(RegistryItemReferenceSchema, {
    default: [],
    description: 'Registry item dependencies.',
    uniqueItems: true,
  })),

  npm: Type.Optional(NPMSchema),
}, {
  $id: 'RegistryDependencies',
  description: 'Dependencies required by a registry item.',
  title: 'Registry Dependencies',
})

export type RegistryDependencies = Static<typeof RegistryDependenciesSchema>
