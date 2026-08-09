import { loadConfig } from 'c12'
import type { NkaConfig } from '../types/config'
import { NKA_CONFIG_FILE_BASE_NAME } from '../constants'

/**
 * Loads the user's Nka configuration.
 * @param cwd Absolute path to the project root.
 * @returns The user's configuration.
 * @throws If config file is not found.
 */
export async function loadNkaConfig(cwd: string) {
  const { config, configFile } = await loadConfig<NkaConfig>({
    cwd,
    name: NKA_CONFIG_FILE_BASE_NAME,
  })

  if (!configFile) {
    throw new Error(`Nka config file not found in "${cwd}". Run \`nka init\` first.`)
  }

  return { config, configFile }
}

/**
 * Generates the content of the Nka configuration file based on the user's choices.
 * @param userChoices An object containing the user's choices.
 * @returns The content of the Nka configuration file as a string.
 */
export function generateNkaConfigContent(userChoices: Pick<NkaConfig, 'components' | 'utils'>) {
  return `import { defineConfig } from '@nka/core'

  export default defineConfig({
    components: {
      dir: '${userChoices.components.dir}',
      import: '${userChoices.components.import}',
    },
    utils: {
      dir: '${userChoices.utils.dir}',
      import: '${userChoices.utils.import}',
    },
  })
`
}
