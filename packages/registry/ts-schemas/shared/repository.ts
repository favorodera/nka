import { type Static, Type } from 'typebox'

export const RepositorySchema = Type.Object({
  source: Type.String({
    description: 'Giget source (e.g. github:foo/bar).',
    examples: [
      'github:foo/bar',
      'gitlab:foo/bar',
    ],
  }),
})

export type Repository = Static<typeof RepositorySchema>
