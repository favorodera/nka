import { version } from '../package.json'

/** Nka current package version, sourced directly from package.json. */
export const VERSION = version

/** Base name of the user configuration file created by `nka init`. */
export const CONFIG_FILE_NAME = 'nka'

/** Base URL for raw files in the current Nka GitHub release. */
export const GITHUB_RAW_CONTENT_URL = `https://raw.githubusercontent.com/favorodera/nka/refs/tags/v${VERSION}`

/** HTTP headers required when fetching raw content from the GitHub API. */
export const GITHUB_RAW_FETCH_HEADERS: HeadersInit = {
  'Accept': 'application/vnd.github.raw+json',
  'X-GitHub-Api-Version': '2026-03-10',
}
