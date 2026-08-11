import { loadConfig } from 'c12'
import type { NkaConfig } from '../types'
import { NKA_CONFIG_FILE_BASE_NAME } from '../constants'

/**
 * Loads the user's Nka configuration.
 * @param cwd Absolute path to the project root.
 * @returns The resolved c12 configuration result.
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

  return config
}

/**
 * Generates the content of the Nka configuration file based on the user's choices.
 * @param config The Nka configuration to serialize.
 * @returns The content of the Nka configuration file as a string.
 */
export function generateNkaConfigContent(config: NkaConfig) {
  const configContent = JSON.stringify(config, undefined, 2)
    .replaceAll(/"([^"]+)":/g, '$1:')
    .replaceAll('"', '\'')

  return `import { defineNkaConfig } from '@nka/core'

export default defineNkaConfig(${configContent})
`
}
