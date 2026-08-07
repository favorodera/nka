import { type Static, Type } from 'typebox'

export const RepositorySchema = Type.Object({
  source: Type.String({
    description: 'Repository source supported by giget.',
    examples: [
      'github:foo/bar',
      'gitlab:foo/bar',
    ],
  }),
})

export type Repository = Static<typeof RepositorySchema>
