import { intro, outro, spinner, tasks } from '@clack/prompts'
import { defineCommand } from 'citty'
import { DEFAULT_REGISTRY_NAME } from '../../constants'
import { loadNkaConfig } from '../../utils/config'
import { confirmRegistryItemsOverwrites } from '../../utils/file-system'
import { installRegistryItems } from '../../utils/install'
import { fetchAndValidateRegistry, resolveRegistryItems, resolveRegistrySource } from '../../utils/registry'

/**
 * Add component command.
 * @returns The command definition.
 */
export function component() {
  return defineCommand({
    args: {
      registry: {
        alias: 'r',
        default: DEFAULT_REGISTRY_NAME,
        description: 'Registry name',
        required: true,
        type: 'string',
      },
    },
    meta: {
      description: 'Add component(s) to the project',
      name: 'component',
    },
    async run({ args }) {
      intro('Adding components')

      const components = args._ as Array<string>

      if (components.length === 0) {
        throw new Error('No components specified. Usage: nka add component <component...>')
      }

      const spin = spinner({
        cancelMessage: 'Cancelled.',
        errorMessage: 'Failed.',
      })

      spin.start('Loading config')
      const nkaConfig = await loadNkaConfig()
      spin.stop('Config loaded')

      spin.start('Resolving registry')
      const source = resolveRegistrySource(args.registry, nkaConfig.registries)
      spin.stop('Registry resolved')

      spin.start('Fetching registry')
      const registry = await fetchAndValidateRegistry(source)
      spin.stop(`Registry "${source.name}" fetched`)

      spin.start('Resolving items')
      const itemsToResolve = components.map(name => ({
        name,
        type: 'component' as const,
      }))
      const resolved = resolveRegistryItems(itemsToResolve, registry)
      spin.stop('Items resolved')

      const shouldWrite = await confirmRegistryItemsOverwrites(
        [
          ...resolved.components.values(),
          ...resolved.utilities.values(),
        ],
        nkaConfig,
      )

      await tasks([
        {
          async task(message) {
            await installRegistryItems(
              resolved.components.values(),
              registry,
              nkaConfig,
              shouldWrite,
              message,
            )
            return 'Components installed'
          },
          title: 'Installing components',
        },
        {
          enabled: resolved.utilities.size > 0,
          async task(message) {
            await installRegistryItems(
              resolved.utilities.values(),
              registry,
              nkaConfig,
              shouldWrite,
              message,
            )
            return 'Utilities installed'
          },
          title: 'Installing utilities',
        },
      ])

      outro('Components added')
    },
  })
}
