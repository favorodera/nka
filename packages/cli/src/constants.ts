import { version } from '../package.json'

/** Nka current package version, sourced directly from package.json. */
export const VERSION = version

/** File name for the user-side Nka config (created by `nka init`). */
export const CONFIG_FILE_NAME = 'nka'

/**
 * Base URL for the Nka core package source tree on GitHub.
 * Every other URL in this file is derived from this one.
 */
export const BASE_URL = `https://raw.githubusercontent.com/favorodera/nka/refs/tags/v${VERSION}/packages`

/**
 * HTTP headers required when fetching raw content from the GitHub API.
 * These ensure we get the raw file bytes, not GitHub's HTML wrapper.
 */
export const GITHUB_RAW_FETCH_HEADERS: Record<string, string> = {
  'Accept': 'application/vnd.github.raw+json',
  'X-GitHub-Api-Version': '2026-03-10',
}
