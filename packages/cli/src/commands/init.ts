import { cancel, group, intro, outro, tasks, text } from '@clack/prompts'
import { defineCommand } from 'citty'
import { join } from 'pathe'
import type { NkaConfig } from '../types/config'
import { NKA_CONFIG_FILE_NAME } from '../constants'
import { generateNkaConfigContent } from '../utils/config'
import {
  confirmOverwrite,
  createDirectory,
  writeToFile,
} from '../utils/file-system'
import { nkaTextFetch } from '../utils/network'
import { installDependency } from '../utils/packages'
import { fetchRegistryIndex } from '../utils/registry'

/**
 * Initializes Nka in the current project.
 *
 * The command collects the user's configuration, resolves the default Nka
 * registry, installs registry-level dependencies, and creates the configured
 * directories and stylesheets.
 * @returns The Nka initialization command.
 */
export function init() {
  return defineCommand({
    meta: {
      description: 'Initialize Nka project',
      name: 'init',
    },
    async run() {
      intro('Initializing Nka project')

      const cwd = process.cwd()
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

      /** Resolve and normalize user choices for operations. */
      const normalizedUserChoices: NkaConfig = {
        ...userChoices,
        components: {
          ...userChoices.components,
          dir: join(cwd, userChoices.components.dir),
        },
        styles: {
          ...userChoices.styles,
          dir: join(cwd, userChoices.styles.dir),
        },
        utils: {
          ...userChoices.utils,
          dir: join(cwd, userChoices.utils.dir),
        },
      }

      /** Resolve the registry once before performing initialization tasks. */
      const registryIndex = await fetchRegistryIndex()

      // Ask all overwrite questions before any file operations begin.
      const shouldWriteNkaConfig = await confirmOverwrite(nkaConfigPath, NKA_CONFIG_FILE_NAME)
      const shouldWriteComponentsDir = await confirmOverwrite(normalizedUserChoices.components.dir, userChoices.components.dir)
      const shouldWriteStylesDir = await confirmOverwrite(normalizedUserChoices.styles.dir, userChoices.styles.dir)
      const shouldWriteUtilsDir = await confirmOverwrite(normalizedUserChoices.utils.dir, userChoices.utils.dir)

      await tasks([
        {
          enabled: shouldWriteNkaConfig,
          async task(message) {
            message('Building configuration.')

            const nkaConfigContent
              = generateNkaConfigContent(userChoices)

            message('Writing configuration.')

            await writeToFile(
              nkaConfigPath,
              nkaConfigContent,
            )

            return `Created "${NKA_CONFIG_FILE_NAME}"`
          },
          title: 'Creating Nka configuration',
        },

        {
          enabled: shouldWriteComponentsDir,
          async task() {
            await createDirectory(normalizedUserChoices.components.dir)

            return (
              `Created components directory in `
              + `"${userChoices.components.dir}"`
            )
          },
          title: 'Creating components directory',
        },

        {
          enabled: shouldWriteUtilsDir,
          async task() {
            await createDirectory(normalizedUserChoices.utils.dir)

            return (
              `Created utilities directory in `
              + `"${userChoices.utils.dir}"`
            )
          },
          title: 'Creating utilities directory',
        },

        {
          enabled: shouldWriteStylesDir,
          async task(message) {
            await createDirectory(normalizedUserChoices.styles.dir)
            message(`Created styles directory in "${userChoices.styles.dir}"`)

            message('Preparing stylesheets paths and urls')
            const themeStyleSheetPath = join(normalizedUserChoices.styles.dir, 'theme.css')
            const themeStyleSheetUrl = new URL('packages/ui/src/css/theme.css', registryIndex.content.metadata.baseUrl)

            const proseStyleSheetPath = join(normalizedUserChoices.styles.dir, 'prose.css')
            const proseStyleSheetUrl = new URL('packages/ui/src/css/prose.css', registryIndex.content.metadata.baseUrl)

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
          enabled: Object.keys(registryIndex.content.metadata?.packages ?? {}).length > 0,
          async task(message) {
            for (const [
              name,
              version,
            ] of Object.entries(registryIndex.content.metadata?.packages ?? {})) {
              message(`Installing ${name}@${version}`)
              await installDependency(name, version, cwd)
            }

            return 'Installed registry package dependencies'
          },
          title: `Installing registry package dependencies`,
        },
      ])

      outro('Initialization Complete!')
    },
  })
}
