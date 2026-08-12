import { cancel, group, intro, outro, spinner, tasks, text } from '@clack/prompts'
import { defineCommand } from 'citty'
import { join } from 'pathe'
import type { NkaConfig } from '../types'
import { DEFAULT_NKA_CONFIG, DEFAULT_REGISTRY_NAME, NKA_CONFIG_FILE_NAME } from '../constants'
import { generateNkaConfigContent } from '../utils/config'
import {
  confirmOverwrite,
  confirmRegistryItemsOverwrites,
  createDirectory,
  writeToFile,
} from '../utils/file-system'
import { installRegistryItems } from '../utils/install'
import { nkaTextFetch } from '../utils/network'
import { installDependency } from '../utils/packages'
import { fetchAndValidateRegistry, resolveRegistryItems, resolveRegistrySource } from '../utils/registry'

/**
 * Initialize Nka in the current project.
 * @returns The command definition.
 */
export function init() {
  return defineCommand({
    meta: {
      description: 'Initialize Nka in your project',
      name: 'init',
    },
    async run() {
      intro('Initializing Nka')

      const cwd = process.cwd()

      const spin = spinner({
        cancelMessage: 'Cancelled.',
        errorMessage: 'Failed.',
      })

      const nkaConfigPath = join(cwd, NKA_CONFIG_FILE_NAME)

      const userChoices = await group(
        {
          components: () => group({
            dir: () => text({
              initialValue: 'src/components',
              message: 'Components directory?',
              placeholder: 'src/components',
            }),
            import: () => text({
              initialValue: '@/components',
              message: 'Components import alias?',
              placeholder: '@/components',
            }),
          }),
          styles: () => group({
            dir: () => text({
              initialValue: 'src/assets/css',
              message: 'Styles directory?',
              placeholder: 'src/assets/css',
            }),
          }),
          utils: () => group({
            dir: () => text({
              initialValue: 'src/utils',
              message: 'Utilities directory?',
              placeholder: 'src/utils',
            }),
            import: () => text({
              initialValue: '@/utils',
              message: 'Utilities import alias?',
              placeholder: '@/utils',
            }),
          }),
        },
        {
          onCancel: () => {
            cancel('Cancelled.')
            process.exit(0)
          },
        },
      )

      const nkaConfig: NkaConfig = {
        components: {
          dir: userChoices.components.dir,
          import: userChoices.components.import,
        },
        registries: {
          ...DEFAULT_NKA_CONFIG.registries,
        },
        styles: {
          dir: userChoices.styles.dir,
        },
        utils: {
          dir: userChoices.utils.dir,
          import: userChoices.utils.import,
        },
      }

      const resolvedPaths = {
        components: join(cwd, userChoices.components.dir),
        styles: join(cwd, userChoices.styles.dir),
        utils: join(cwd, userChoices.utils.dir),
      }

      // All overwrite prompts up-front (dirs + config)
      const shouldWriteNkaConfig = await confirmOverwrite(nkaConfigPath)
      const shouldWriteComponentsDir = await confirmOverwrite(resolvedPaths.components)
      const shouldWriteStylesDir = await confirmOverwrite(resolvedPaths.styles)
      const shouldWriteUtilsDir = await confirmOverwrite(resolvedPaths.utils)

      spin.start('Resolving registry')
      const source = resolveRegistrySource(DEFAULT_REGISTRY_NAME, nkaConfig.registries)
      spin.stop('Registry resolved')

      spin.start('Fetching registry')
      const registry = await fetchAndValidateRegistry(source)
      spin.stop(`Registry "${source.name}" fetched`)

      // Resolve default utilities + their overwrite decisions before any tasks
      spin.start('Resolving registry utilities')
      const utilityNames = registry.metadata.dependencies?.utilities ?? []
      const itemsToResolve = utilityNames.map(name => ({
        name,
        type: 'utility' as const,
      }))
      const resolvedUtilities = resolveRegistryItems(itemsToResolve, registry)
      spin.stop('Registry utilities resolved')

      const shouldWriteUtilities = await confirmRegistryItemsOverwrites(
        [...resolvedUtilities.utilities.values()],
        nkaConfig,
      )

      await tasks([
        {
          enabled: shouldWriteNkaConfig,
          async task(message) {
            message('Writing config')
            await writeToFile(nkaConfigPath, generateNkaConfigContent(nkaConfig))
            return `Created ${NKA_CONFIG_FILE_NAME}`
          },
          title: 'Creating config',
        },
        {
          enabled: shouldWriteComponentsDir,
          async task() {
            await createDirectory(resolvedPaths.components)
            return `Created ${userChoices.components.dir}`
          },
          title: 'Creating components dir',
        },
        {
          enabled: shouldWriteUtilsDir,
          async task() {
            await createDirectory(resolvedPaths.utils)
            return `Created ${userChoices.utils.dir}`
          },
          title: 'Creating utilities dir',
        },
        {
          enabled: shouldWriteStylesDir,
          async task(message) {
            await createDirectory(resolvedPaths.styles)

            const themePath = join(resolvedPaths.styles, 'theme.css')
            const prosePath = join(resolvedPaths.styles, 'prose.css')
            const base = registry.metadata.baseUrl

            message('Fetching theme.css')
            const theme = await nkaTextFetch(new URL('packages/ui/src/css/theme.css', base).href)
            message('Writing theme.css')
            await writeToFile(themePath, theme)

            message('Fetching prose.css')
            const prose = await nkaTextFetch(new URL('packages/ui/src/css/prose.css', base).href)
            message('Writing prose.css')
            await writeToFile(prosePath, prose)

            return `Created styles in ${userChoices.styles.dir}`
          },
          title: 'Installing styles',
        },
        {
          enabled: resolvedUtilities.utilities.size > 0,
          async task(message) {
            await installRegistryItems(
              resolvedUtilities.utilities.values(),
              registry,
              nkaConfig,
              shouldWriteUtilities,
              message,
            )
            return 'Utilities installed'
          },
          title: 'Installing utilities',
        },
        {
          enabled: !!registry.metadata.dependencies?.packages,
          async task(message) {
            for (const [
              name,
              version,
            ] of Object.entries(registry.metadata.dependencies?.packages ?? {})) {
              message(`Installing ${name}@${version}`)
              await installDependency(name, version)
            }
            return 'Packages installed'
          },
          title: 'Installing packages',
        },
      ])

      outro('Initialization complete')
    },
  })
}
