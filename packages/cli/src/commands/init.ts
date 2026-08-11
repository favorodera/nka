import type { Registry } from '@nka/registry'
import { cancel, group, intro, outro, tasks, text } from '@clack/prompts'
import { defineCommand } from 'citty'
import { join } from 'pathe'
import type { NkaConfig } from '../types'
import { DEFAULT_NKA_CONFIG, DEFAULT_REGISTRY_NAME, NKA_CONFIG_FILE_NAME } from '../constants'
import { generateNkaConfigContent } from '../utils/config'
import {
  confirmOverwrite,
  createDirectory,
  writeToFile,
} from '../utils/file-system'
import { nkaTextFetch } from '../utils/network'
import { installDependency } from '../utils/packages'
import { fetchRegistry, resolveRegistrySource } from '../utils/registry'

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

      /** The current working directory. */
      const cwd = process.cwd()

      /** Registry populated inside the registry fetch task. */
      let registry: Registry

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
      const shouldWriteNkaConfig = await confirmOverwrite(nkaConfigPath, NKA_CONFIG_FILE_NAME)
      const shouldWriteComponentsDir = await confirmOverwrite(resolvedPaths.components, userChoices.components.dir)
      const shouldWriteStylesDir = await confirmOverwrite(resolvedPaths.styles, userChoices.styles.dir)
      const shouldWriteUtilsDir = await confirmOverwrite(resolvedPaths.utils, userChoices.utils.dir)

      await tasks([
        {
          async task(message) {
            message('Resolving registry')
            const source = resolveRegistrySource(DEFAULT_REGISTRY_NAME, nkaConfig.registries)

            message('Fetching registry')
            registry = await fetchRegistry(source)

            return `Fetched registry "${source.name}"`
          },
          title: 'Fetching registry',
        },

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
          async task(message) {
            const packages = registry.metadata.packages ?? {}

            if (Object.keys(packages).length === 0) {
              return 'No registry package dependencies'
            }

            for (const [
              name,
              version,
            ] of Object.entries(packages)) {
              message(`Installing ${name}@${version}`)
              await installDependency(name, version, cwd)
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
