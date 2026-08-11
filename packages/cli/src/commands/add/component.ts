import { intro, outro, tasks } from '@clack/prompts'
import { defineCommand } from 'citty'
import type { FetchedRegistryIndex, NkaConfig } from '../../types'
import { DEFAULT_REGISTRY_NAME } from '../../constants'
import { loadNkaConfig } from '../../utils/config'
import { fetchRegistryIndex, resolveRegistryUrl } from '../../utils/registry'

/**
 * Adds a component from the Nka registry to the project.
 * @returns The Nka add component command.
 */
export function component() {
  return defineCommand({
    args: {
      registry: {
        alias: 'r',
        default: DEFAULT_REGISTRY_NAME,
        description: 'Name of registry to use',
        required: true,
        type: 'string',
      },
    },
    meta: {
      description: 'Add one or more component(s) to the project',
      name: 'component',
    },
    async run({ args }) {
      intro('Adding component(s)')

      /** The current working directory. */
      const cwd = process.cwd()

      /** Nka config populated inside the config load task. */
      let nkaConfig: NkaConfig

      /** Registry index populated inside the registry fetch task. */
      let registryIndex: FetchedRegistryIndex

      const components = args._ as Array<string>

      if (components.length === 0) {
        throw new Error('No components specified. Usage: nka add component <component...>')
      }

      await tasks([
        {
          async task() {
            nkaConfig = await loadNkaConfig(cwd)

            return `Loaded Nka config`
          },
          title: 'Loading Nka config',
        },

        {
          async task(message) {
            message('Resolving registry')
            const source = resolveRegistryUrl(args.registry, nkaConfig.registries)

            message('Fetching registry index')
            registryIndex = await fetchRegistryIndex(source)

            return `Fetched registry "${source.name}"`
          },
          title: 'Fetching registry index',
        },
      ])

      outro('Component(s) added successfully')
    },
  })
}
