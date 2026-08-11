import { intro, outro, spinner, tasks } from '@clack/prompts'
import { defineCommand } from 'citty'
import { basename } from 'pathe'
import { DEFAULT_REGISTRY_NAME } from '../../constants'
import { loadNkaConfig } from '../../utils/config'
import { confirmRegistryItemsOverwrites, resolveItemInstallPath, writeToFile } from '../../utils/file-system'
import { nkaTextFetch } from '../../utils/network'
import { fetchRegistry, resolveRegistryItems, resolveRegistrySource } from '../../utils/registry'

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

      const components = args._ as Array<string>

      if (components.length === 0) {
        throw new Error('No components specified. Usage: nka add component <component...>')
      }

      const spin = spinner({
        cancelMessage: 'Operation cancelled by user.',
        errorMessage: 'Operation failed unexpectedly.',
      })

      spin.start('Loading Nka config')
      const nkaConfig = await loadNkaConfig(cwd)
      spin.stop('Loaded Nka config')

      spin.start('Resolving registry')
      const source = resolveRegistrySource(args.registry, nkaConfig.registries)
      spin.stop('Resolved registry')

      spin.start('Fetching registry')
      const registry = await fetchRegistry(source)
      spin.stop(`Fetched registry "${source.name}"`)

      spin.start('Resolving registry items')
      const itemsToResolve = components.map(name => ({
        name,
        type: 'component' as const,
      }))
      const resolvedRegistryItems = resolveRegistryItems(itemsToResolve, registry)
      spin.stop('Resolved registry items')

      // Ask all overwrite questions before any file operations begin.
      const shouldWriteChoices = await confirmRegistryItemsOverwrites(
        [
          ...resolvedRegistryItems.components.values(),
          ...resolvedRegistryItems.utilities.values(),
        ],
        nkaConfig,
        cwd,
      )

      await tasks([
        {
          async task(message) {
            for (const component of resolvedRegistryItems.components.values()) {
              message(`Installing ${component.name}...`)

              for (const file of component.files) {
                const targetUrl = new URL(file, registry.metadata.baseUrl).href
                const targetPath = resolveItemInstallPath(component, file, nkaConfig, cwd)

                if (shouldWriteChoices.get(targetPath)) {
                  message(`Fetching ${component.name} (${basename(file)})`)
                  const fileContent = await nkaTextFetch(targetUrl)

                  message(`Writing ${component.name} (${basename(file)})`)
                  await writeToFile(targetPath, fileContent)
                }
              }
            }

            return 'Installed component(s)'
          },
          title: 'Installing component(s)',
        },
      ])

      outro('Component(s) added successfully')
    },
  })
}
