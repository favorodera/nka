import { cancel, group, intro, outro, spinner, tasks, text } from '@clack/prompts'
import { defineCommand } from 'citty'
import { basename, join } from 'pathe'
import type { NkaConfig } from '../types'
import { DEFAULT_NKA_CONFIG, DEFAULT_REGISTRY_NAME, NKA_CONFIG_FILE_NAME } from '../constants'
import { generateNkaConfigContent } from '../utils/config'
import {
  confirmOverwrite,
  confirmRegistryItemsOverwrites,
  createDirectory,
  resolveItemInstallPath,
  writeToFile,
} from '../utils/file-system'
import { nkaTextFetch } from '../utils/network'
import { installDependency } from '../utils/packages'
import { fetchRegistry, resolveRegistryItems, resolveRegistrySource } from '../utils/registry'

/**
 * Initializes Nka in the current project.
 *
 * Prompts for project paths, creates the Nka configuration,
 * installs required dependencies, and adds the default styles.
 * @returns The Nka init command.
 */
export function init() {
  return defineCommand({
    meta: {
      description: 'Initialize Nka in your project',
      name: 'init',
    },
    async run() {
      intro('Initializing Nka project')

      const cwd = process.cwd()

      const spin = spinner({
        cancelMessage: 'Operation cancelled by user.',
        errorMessage: 'Operation failed unexpectedly.',
      })

      const nkaConfigPath = join(cwd, NKA_CONFIG_FILE_NAME)

      /** Collects all initialization options before performing operations. */
      const userChoices = await group(
        {
          components: () => group({
            dir: () => text({
              initialValue: 'src/components',
              message: 'Where do you want to store components?',
              placeholder: 'src/components',
            }),

            import: () => text({
              initialValue: '@/components',
              message: 'What import alias should components use?',
              placeholder: '@/components',
            }),
          }),

          utils: () => group({
            dir: () => text({
              initialValue: 'src/utils',
              message: 'Where do you want to store utilities?',
              placeholder: 'src/utils',
            }),

            import: () => text({
              initialValue: '@/utils',
              message: 'What import alias should utilities use?',
              placeholder: '@/utils',
            }),
          }),

          styles: () => group({
            dir: () => text({
              initialValue: 'src/assets/css',
              message: 'Where do you want to store Nka styles?',
              placeholder: 'src/assets/css',
            }),
          }),
        },
        {
          onCancel: () => {
            cancel('Operation cancelled by user.')
            process.exit(0)
          },
        },
      )

      /** The full Nka config to write — user paths + default registries. */
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

      /** Absolute paths resolved from user choices for file operations. */
      const resolvedPaths = {
        components: join(cwd, userChoices.components.dir),
        styles: join(cwd, userChoices.styles.dir),
        utils: join(cwd, userChoices.utils.dir),
      }

      // Ask all overwrite questions before any file operations begin.
      const shouldWriteNkaConfig = await confirmOverwrite(nkaConfigPath)
      const shouldWriteComponentsDir = await confirmOverwrite(resolvedPaths.components)
      const shouldWriteStylesDir = await confirmOverwrite(resolvedPaths.styles)
      const shouldWriteUtilsDir = await confirmOverwrite(resolvedPaths.utils)

      spin.start('Resolving registry')
      const source = resolveRegistrySource(DEFAULT_REGISTRY_NAME, nkaConfig.registries)
      spin.stop('Resolved registry')

      spin.start('Fetching registry')
      const registry = await fetchRegistry(source)
      spin.stop(`Fetched registry "${source.name}"`)

      await tasks([
        {
          enabled: shouldWriteNkaConfig,
          async task(message) {
            message('Building configuration.')

            const nkaConfigContent = generateNkaConfigContent(nkaConfig)

            message('Writing configuration.')

            await writeToFile(nkaConfigPath, nkaConfigContent)

            return `Created "${NKA_CONFIG_FILE_NAME}"`
          },
          title: 'Creating Nka configuration',
        },

        {
          enabled: shouldWriteComponentsDir,
          async task() {
            await createDirectory(resolvedPaths.components)

            return (`Created components directory in "${userChoices.components.dir}"`)
          },
          title: 'Creating components directory',
        },

        {
          enabled: shouldWriteUtilsDir,
          async task() {
            await createDirectory(resolvedPaths.utils)

            return (`Created utilities directory in "${userChoices.utils.dir}"`
            )
          },
          title: 'Creating utilities directory',
        },

        {
          enabled: shouldWriteStylesDir,
          async task(message) {
            await createDirectory(resolvedPaths.styles)
            message(`Created styles directory in "${userChoices.styles.dir}"`)

            message('Preparing stylesheets paths and urls')
            const themeStyleSheetPath = join(resolvedPaths.styles, 'theme.css')
            const themeStyleSheetUrl = new URL('packages/ui/src/css/theme.css', registry.metadata.baseUrl)

            const proseStyleSheetPath = join(resolvedPaths.styles, 'prose.css')
            const proseStyleSheetUrl = new URL('packages/ui/src/css/prose.css', registry.metadata.baseUrl)

            message('Downloading theme stylesheet')
            const themeStyleSheet = await nkaTextFetch(themeStyleSheetUrl.href)

            message('Writing theme stylesheet.')
            await writeToFile(themeStyleSheetPath, themeStyleSheet)

            message('Downloading prose stylesheet')
            const proseStyleSheet = await nkaTextFetch(proseStyleSheetUrl.href)

            message('Writing prose stylesheet.')
            await writeToFile(proseStyleSheetPath, proseStyleSheet)

            return `Created Nka styles in "${userChoices.styles.dir}"`
          },
          title: 'Installing Nka styles',
        },

        {
          enabled: (registry.metadata.dependencies?.utilities ?? []).length > 0,
          async task(message) {
            message('Resolving registry items')
            const itemsToResolve = (registry.metadata.dependencies?.utilities ?? []).map(name => ({
              name,
              type: 'utility' as const,
            }))
            const resolvedRegistryItems = resolveRegistryItems(itemsToResolve, registry)
            message('Resolved registry items')

            // Ask all overwrite questions before any file operations begin.
            const shouldWriteChoices = await confirmRegistryItemsOverwrites(
              [...resolvedRegistryItems.utilities.values()],
              nkaConfig,
            )

            for (const utility of resolvedRegistryItems.utilities.values()) {
              message(`Installing ${utility.name}...`)

              for (const file of utility.files) {
                const targetUrl = new URL(file, registry.metadata.baseUrl).href
                const targetPath = resolveItemInstallPath(utility, file, nkaConfig)

                if (shouldWriteChoices.get(targetPath)) {
                  message(`Fetching ${utility.name} (${basename(file)})`)
                  const fileContent = await nkaTextFetch(targetUrl)

                  message(`Writing ${utility.name} (${basename(file)})`)
                  await writeToFile(targetPath, fileContent)
                }
              }
            }

            return 'Installed registry utilities'
          },
          title: 'Installing registry utilities',
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

            return 'Installed registry package dependencies'
          },
          title: 'Installing registry package dependencies',
        },
      ])

      outro('Initialization Complete')
    },
  })
}
