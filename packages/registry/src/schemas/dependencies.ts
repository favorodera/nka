import { type Static, Type } from 'typebox'

const PackageName = Type.String({
  description: 'A valid npm package name.',
})

const VersionRange = Type.String({
  description: 'A valid npm version specifier.',
})

export const RegistryDependenciesSchema = Type.Object({
  registry: Type.Array(
    Type.String({
      description: 'Registry item dependency.',
      pattern: '^[a-z][a-z0-9-]*$',
    }),
    {
      default: [],
      description: 'Registry dependencies.',
      uniqueItems: true,
    },
  ),

  npm: Type.Object({
    dependencies: Type.Record(
      PackageName,
      VersionRange,
      {
        default: {},
      },
    ),

    devDependencies: Type.Record(
      PackageName,
      VersionRange,
      {
        default: {},
      },
    ),
  }),
}, {
  $id: 'RegistryDependencies',
  description: 'Dependencies required by a registry item.',
  title: 'Registry Dependencies',
})

export type RegistryDependencies = Static<typeof RegistryDependenciesSchema>
