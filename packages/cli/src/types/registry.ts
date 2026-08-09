/** Represents a resolved registry source. */
export interface ResolvedRegistry {
  /** Registry identifier. */
  name: string

  /** URL of the registry index. */
  indexUrl: string

  /** Base URL from which registry files can be fetched. */
  baseUrl: string
}
