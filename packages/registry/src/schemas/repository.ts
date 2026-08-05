import { type Static, Type } from 'typebox'

export const RegistryRepositorySchema = Type.Object({
  source: Type.String({
    description: 'Repository source supported by giget.',
    examples: [
      'github:nka-ui/docs-starter',
      'github:nka-ui/docs-starter#main',
      'github:nka-ui/docs-starter/templates/default',
      'gitlab:foo/bar',
    ],
  }),
}, {
  $id: 'RegistryRepository',
  description: 'A repository source for repository-based registry items.',
  title: 'Registry Repository',
})

export type RegistryRepository = Static<typeof RegistryRepositorySchema>
