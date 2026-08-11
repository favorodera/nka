import type { NkaConfig } from './types'

/** Name of the built-in Nka registry. */
export const DEFAULT_REGISTRY_NAME = 'nka'

/** URL of the built-in Nka registry index. */
export const DEFAULT_REGISTRY_URL = 'https://raw.githubusercontent.com/favorodera/nka/refs/heads/main/packages/registry/src/index.json'

/** Default Nka configuration values. */
export const DEFAULT_NKA_CONFIG = {
  registries: {
    [DEFAULT_REGISTRY_NAME]: DEFAULT_REGISTRY_URL,
  },
} satisfies Partial<NkaConfig>

/** Base name of the Nka configuration file. */
export const NKA_CONFIG_FILE_BASE_NAME = 'nka'

/** File name of the Nka configuration file. */
export const NKA_CONFIG_FILE_NAME = `${NKA_CONFIG_FILE_BASE_NAME}.config.ts`
