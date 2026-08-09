import { cancel, group, intro, tasks, text } from '@clack/prompts'
import { defineCommand } from 'citty'
import { join } from 'pathe'
import { DEFAULT_STYLESHEETS_DIR_URL, NKA_CONFIG_FILE_NAME } from '../constants'
import { generateNkaConfigContent } from '../utils/config'
import { confirmOverwrite, createDirectory, writeToFile } from '../utils/file-system'
import { nkaTextFetch } from '../utils/network'

/**
 * Command for initializing a new Nka project.
 * @returns Command that can be used to initialize a new Nka project.
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

      // Collect all user choices so they aren't prompted again
      const userChoices = await group(
        {
          components:  () =>  group({
            dir: () =>  text({
              initialValue: 'src/components/nka',
              message: 'Where do you want to store components?',
              placeholder: 'src/components/nka',
            }),

            import: () => text({
              initialValue: '@/components/nka',
              message: 'What import alias should components use?',
              placeholder: '@/components/nka',
            }),
          }),

          utils: () => group({
            dir: () => text({
              initialValue: 'src/utils/nka',
              message: 'Where do you want to store utilities?',
              placeholder: 'src/utils/nka',
            }),

            import: () => text({
              initialValue: '@/utils/nka',
              message: 'What import alias should utilities use?',
              placeholder: '@/utils/nka',
            }),
          }),

          styles: () => group({
            dir: () => text({
              initialValue: 'src/assets/css/nka',
              message: 'Where do you want to store theme styles?',
              placeholder: 'src/assets/css/nka',
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

      // Resolve and normalize user choices for operations.
      const normalizedUserChoices = {
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

      // Ask all overwrite questions before any file operations begin.
      const shouldWriteNkaConfig = await confirmOverwrite(nkaConfigPath, NKA_CONFIG_FILE_NAME)
      const shouldWriteComponentsDir = await confirmOverwrite(normalizedUserChoices.components.dir, userChoices.components.dir)
      const shouldWriteStylesDir = await confirmOverwrite(normalizedUserChoices.styles.dir, userChoices.styles.dir)
      const shouldWriteUtilsDir = await confirmOverwrite(normalizedUserChoices.utils.dir, userChoices.utils.dir)

      await tasks([
        {
          enabled: shouldWriteNkaConfig,
          async task(message) {
            message('Building config content.')
            const nkaConfigContent = generateNkaConfigContent(userChoices)

            message('Writing to disk.')
            await writeToFile(nkaConfigPath, nkaConfigContent)

            return `Created Nka config in "${NKA_CONFIG_FILE_NAME}"`
          },
          title: `Creating Nka config in "${NKA_CONFIG_FILE_NAME}"`,
        },

        {
          enabled: shouldWriteComponentsDir,
          async task() {
            await createDirectory(normalizedUserChoices.components.dir)
            return `Created components directory in "${userChoices.components.dir}"`
          },
          title: `Creating components directory in "${userChoices.components.dir}"`,
        },

        {
          enabled: shouldWriteUtilsDir,
          async task() {
            await createDirectory(normalizedUserChoices.utils.dir)
            return `Created utilities directory in "${userChoices.utils.dir}"`
          },
          title: `Creating utilities directory in "${userChoices.utils.dir}"`,
        },

        {
          enabled: shouldWriteStylesDir,
          async task(message) {
            await createDirectory(normalizedUserChoices.styles.dir)
            message(`Created styles directory in "${userChoices.styles.dir}"`)

            message('Preparing stylesheets paths')
            const themeStyleSheetPath = join(normalizedUserChoices.styles.dir, 'theme.css')
            const proseStyleSheetPath = join(normalizedUserChoices.styles.dir, 'prose.css')

            message('Downloading theme stylesheet')
            const themeStyleSheet = await nkaTextFetch(`${DEFAULT_STYLESHEETS_DIR_URL}/theme.css`)

            message('Writing to disk')
            await writeToFile(themeStyleSheetPath, themeStyleSheet)
            
            message('Downloading prose stylesheet')
            const proseStyleSheet = await nkaTextFetch(`${DEFAULT_STYLESHEETS_DIR_URL}/prose.css`)

            message('Writing to disk')
            await writeToFile(proseStyleSheetPath, proseStyleSheet)
            
            return `Created styles directory in "${userChoices.styles.dir}"`
          },
          title: `Creating styles directory in "${userChoices.styles.dir}"`,
        },
      ])
    },
  })
}
