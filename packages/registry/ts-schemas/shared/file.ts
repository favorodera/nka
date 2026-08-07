import { type Static, Type } from 'typebox'

export const FileSchema = Type.String({
  description: 'Path to a registry item file.',
  examples: [
    'components/alert.vue',
    'utils/props.ts',
  ],
})

export type File = Static<typeof FileSchema>
