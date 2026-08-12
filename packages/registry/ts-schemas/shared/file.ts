import { type Static, Type } from 'typebox'

export const FileSchema = Type.String({
  description: 'File path relative to registry base.',
  examples: [
    'components/alert.vue',
    'utils/props.ts',
  ],
})

export type File = Static<typeof FileSchema>
