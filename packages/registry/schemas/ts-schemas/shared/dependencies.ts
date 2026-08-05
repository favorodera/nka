import { type Static, Type } from 'typebox'
import { RegistryItemReferenceSchema } from './reference'

const PackageName = Type.String({
  description: 'A valid npm package name.',
})

const VersionRange = Type.String({
  description: 'A valid npm version specifier.',
})

export const RegistryDependenciesSchema = Type.Object({
  registry: Type.Optional(Type.Array(RegistryItemReferenceSchema, {
    default: [],
    description: 'Registry item dependencies.',
    uniqueItems: true,
  })),

  npm: Type.Optional(Type.Object({
    dependencies: Type.Optional(Type.Record(
      PackageName,
      VersionRange,
      {
        default: {},
      },
    )),

    devDependencies: Type.Optional(Type.Record(
      PackageName,
      VersionRange,
      {
        default: {},
      },
    )),
  })),
}, {
  $id: 'RegistryDependencies',
  description: 'Dependencies required by a registry item.',
  title: 'Registry Dependencies',
})

export type RegistryDependencies = Static<typeof RegistryDependenciesSchema>
