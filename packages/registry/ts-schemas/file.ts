import { type Static, Type } from 'typebox'

export const FileSchema = Type.String({
  description: 'File path relative to registry base.',
  examples: [
    'packages/ui/src/components/button/button.vue',
    'packages/ui/src/utils/styling.ts',
  ],
  minLength: 1,
})

export type File = Static<typeof FileSchema>
