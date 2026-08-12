import type { Component, Utility } from '@nka/registry'

/** Resolved registry source. */
export interface ResolvedRegistrySource {
  /** The name of the registry. */
  name: string

  /** The URL of the registry index. */
  url: string
}

/** Resolved items and their package dependencies. */
export interface ResolvedRegistryItems {
  /** Map of component names to their component metadata. */
  components: Map<string, Component>

  /** Map of utility names to their utility metadata. */
  utilities: Map<string, Utility>

  /** Map of package names to their required version ranges. */
  packages: Map<string, string>
}
