import type { NkaConfig } from './types/config'
import { version } from '../package.json'

/** The URL of the default registry index. */
export const DEFAULT_REGISTRY_INDEX = `https://raw.githubusercontent.com/favorodera/nka/refs/tags/v${version}/packages/registry/src/index.json`

/** Base name of the user configuration file created by `nka init`. */
export const NKA_CONFIG_FILE_NAME = 'nka'

export const NKA_CONFIG_DEFAULTS = {
  registries: {
    nka: DEFAULT_REGISTRY_INDEX,
  },
} satisfies Partial<NkaConfig>;

/** HTTP headers required when fetching raw content from the GitHub API. */
export const GITHUB_RAW_FETCH_HEADERS: HeadersInit = {
  'Accept': 'application/vnd.github.raw+json',
  'X-GitHub-Api-Version': '2026-03-10',
}
