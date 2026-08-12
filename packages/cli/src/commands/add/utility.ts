import { intro, outro, spinner, tasks } from '@clack/prompts'
import { defineCommand } from 'citty'
import { COMMON_COMMAND_ARGS } from '../../constants'
import { loadNkaConfig } from '../../utils/config'
import { confirmRegistryItemsOverwrites } from '../../utils/file-system'
import { installDependency } from '../../utils/packages'
import { fetchAndValidateRegistry, installRegistryItems, resolveRegistryItems, resolveRegistrySource } from '../../utils/registry'

/**
 * Add utility command.
 * @returns The command definition.
 */
export function utility() {
  return defineCommand({
    args: {
      registry: COMMON_COMMAND_ARGS.registry,
    },
    meta: {
      description: 'Add utility(ies) to the project',
      name: 'utility',
    },
    async run({ args }) {
      intro('Adding utilities')

      const utilities = args._ as Array<string>

      if (utilities.length === 0) {
        throw new Error('No utilities specified. Usage: nka add utility <utility...>')
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
      const itemsToResolve = utilities.map(name => ({
        name,
        type: 'utility' as const,
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
          enabled: resolved.packages.size > 0,
          async task(message) {
            for (const [
              name,
              version,
            ] of resolved.packages.entries()) {
              await installDependency(name, version, message)
            }
            return 'Packages installed'
          },
          title: 'Installing packages',
        },
      ])

      outro('Utilities added')
    },
  })
}
