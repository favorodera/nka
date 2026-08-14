import { loadConfig } from 'c12'
import JSON5 from 'json5'
import { relative } from 'pathe'
import type { NkaConfig } from '../types'
import { NKA_CONFIG_FILE_BASE_NAME, NKA_CONFIG_FILE_NAME } from '../constants'

/**
 * Loads the Nka config.
 * @returns The resolved Nka config.
 * @throws If config file is not found.
 */
export async function loadNkaConfig() {
  const cwd = process.cwd()

  const { config, configFile } = await loadConfig<NkaConfig>({
    cwd,
    name: NKA_CONFIG_FILE_BASE_NAME,
  })

  if (!configFile) {
    throw new Error(`Nka config not found in "${relative(cwd, NKA_CONFIG_FILE_NAME)}". Run \`nka init\` first.`)
  }

  return config
}

/**
 * Serializes Nka config to TypeScript source.
 * @param config The Nka config to serialize.
 * @returns The serialized Nka config.
 */
export function generateNkaConfigContent(config: NkaConfig) {
  const configContent = JSON5.stringify(config, {
    quote: `'`,
    space: 2,
  })

  return `import { defineNkaConfig } from '@nka/core'

export default defineNkaConfig(${configContent})
`
}
