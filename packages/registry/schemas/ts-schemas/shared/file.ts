import { type Static, Type } from 'typebox'

export const RegistryFileSchema = Type.String({
  $id: 'RegistryFile',
  description: 'A file belonging to a registry item.',
  examples: [
    'components/alert.vue',
    'components/alert/index.ts',
    'utils/props.ts',
  ],
  title: 'Registry File',
})

export type RegistryFile = Static<typeof RegistryFileSchema>
