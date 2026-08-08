import { loadConfig } from 'c12'
import type { NkaConfig } from '../types/config'
import { NKA_CONFIG_FILE_NAME } from '../constants'

/**
 * Loads the user's Nka configuration.
 * @param cwd Absolute path to the project root.
 * @returns The user's configuration.
 * @throws If config file is not found.
 */
export async function loadNkaConfig(cwd: string) {
  const { config, configFile } = await loadConfig<NkaConfig>({
    cwd,
    name: NKA_CONFIG_FILE_NAME,
  })

  if (!configFile) {
    throw new Error(`Nka config file not found in "${cwd}". Run \`nka init\` first.`)
  }

  return { config, configFile }
}