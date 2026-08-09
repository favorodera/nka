import type { NkaConfig } from './types/config'
import { version } from '../package.json'

/** The URL to the default registry index. */
export const DEFAULT_REGISTRY_INDEX = `https://raw.githubusercontent.com/favorodera/nka/refs/tags/v${version}/packages/registry/src/index.json`

/** The URL to the default stylesheets directory. */
export const DEFAULT_STYLESHEETS_DIR_URL = `https://raw.githubusercontent.com/favorodera/nka/refs/tags/v${version}/packages/ui/src/css`

/** Base name of user configuration file. */
export const NKA_CONFIG_FILE_BASE_NAME = 'nka'

/** File name of user configuration file. */
export const NKA_CONFIG_FILE_NAME = `${NKA_CONFIG_FILE_BASE_NAME}.config.ts`

export const NKA_CONFIG_DEFAULTS = {
  registries: {
    nka: DEFAULT_REGISTRY_INDEX,
  },
} satisfies Partial<NkaConfig>

/** HTTP headers required when fetching raw content from the GitHub API. */
export const GITHUB_RAW_FETCH_HEADERS: HeadersInit = {
  'Accept': 'application/vnd.github.raw+json',
  'X-GitHub-Api-Version': '2026-03-10',
}
