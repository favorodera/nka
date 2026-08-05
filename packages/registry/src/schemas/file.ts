import { type Static, Type } from 'typebox'

export const RegistryFileSchema = Type.Object({
  path: Type.String({
    description: 'Path to the file within the registry.',
    examples: [
      'components/alert.vue',
      'components/alert/index.ts',
      'utils/props.ts',
    ],
  }),
}, {
  $id: 'RegistryFile',
  description: 'A file belonging to a registry item.',
  title: 'Registry File',
})

export type RegistryFile = Static<typeof RegistryFileSchema>
