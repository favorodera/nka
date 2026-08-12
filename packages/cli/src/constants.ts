import type { EnumArgDef, PositionalArgDef, StringArgDef } from 'citty'
import type { NkaConfig } from './types'

/** Built-in registry name. */
export const DEFAULT_REGISTRY_NAME = 'nka'

/** Built-in registry index URL. */
export const DEFAULT_REGISTRY_URL = 'https://raw.githubusercontent.com/favorodera/nka/refs/heads/main/packages/registry/src/index.json'

/** Default Nka config values. */
export const DEFAULT_NKA_CONFIG = {
  registries: {
    [DEFAULT_REGISTRY_NAME]: DEFAULT_REGISTRY_URL,
  },
} satisfies Partial<NkaConfig>

/** Config file base name (for c12). */
export const NKA_CONFIG_FILE_BASE_NAME = 'nka'

/** Config file name. */
export const NKA_CONFIG_FILE_NAME = `${NKA_CONFIG_FILE_BASE_NAME}.config.ts`

/** Common arguments for commands. */
export const COMMON_COMMAND_ARGS: Record<string, EnumArgDef | PositionalArgDef | StringArgDef> = {
  registry: {
    alias: 'r',
    default: DEFAULT_REGISTRY_NAME,
    description: 'Registry name',
    required: true,
    type: 'string',
  },
}
