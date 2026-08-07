/** Base name of the user configuration file created by `nka init`. */
export const CONFIG_FILE_NAME = 'nka'

/** HTTP headers required when fetching raw content from the GitHub API. */
export const GITHUB_RAW_FETCH_HEADERS: HeadersInit = {
  'Accept': 'application/vnd.github.raw+json',
  'X-GitHub-Api-Version': '2026-03-10',
}
