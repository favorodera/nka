import type { NkaConfig } from './types/config'

/** Name of the built-in Nka registry. */
export const DEFAULT_REGISTRY_NAME = 'nka'

/**
 * URL of the built-in Nka registry index.
 *
 * The registry is pinned to the current Nka release so that CLI releases
 * always consume a matching registry version.
 */
export const DEFAULT_REGISTRY_INDEX = `https://raw.githubusercontent.com/favorodera/nka/refs/heads/main/packages/registry/src/index.json`
// export const DEFAULT_REGISTRY_INDEX = `https://raw.githubusercontent.com/favorodera/nka/refs/tags/v${version}/packages/registry/src/index.json`

/** Base name of the Nka configuration file. */
export const NKA_CONFIG_FILE_BASE_NAME = 'nka'

/** File name of the Nka configuration file. */
export const NKA_CONFIG_FILE_NAME = `${NKA_CONFIG_FILE_BASE_NAME}.config.ts`

/**
 * Built-in registry configuration.
 * User-defined registries can be added through the Nka configuration.
 */
export const NKA_CONFIG_DEFAULTS = {
  registries: {
    [DEFAULT_REGISTRY_NAME]: DEFAULT_REGISTRY_INDEX,
  },
} satisfies Partial<NkaConfig>
