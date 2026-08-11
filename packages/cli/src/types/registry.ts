import type { Component, Utility } from '@nka/registry'

/** The resolved source of a registry. */
export interface ResolvedRegistrySource {
  /** The name of the registry. */
  readonly name: string

  /** The URL of the registry index. */
  readonly url: string
}

/** A resolved collection of registry items, their dependencies, and required packages. */
export interface ResolvedRegistryItems {
  /** Map of component names to their full component definitions. */
  components: Map<string, Component>

  /** Map of utility names to their full utility definitions. */
  utilities: Map<string, Utility>

  /** Map of package names to their required version ranges. */
  packages: Map<string, string>
}
