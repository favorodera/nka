import type { Registry } from '@nka/registry'

/** The resolved source of a registry. */
export interface ResolvedRegistrySource {
  /** The name of the registry. */
  readonly name: string

  /** The URL of the registry index. */
  readonly indexUrl: string
}

/** A registry index that has been fetched from a resolved source. */
export interface FetchedRegistryIndex {
  /** The content of the registry index. */
  content: Registry

  /** The source of the registry index. */
  source: ResolvedRegistrySource
}
