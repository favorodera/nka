import { type Item, type ItemBase, type Registry, RegistrySchema } from '@nka/registry'
import Schema from 'typebox/schema'
import type { NkaConfig, ResolvedRegistryItems, ResolvedRegistrySource } from '../types'
import { nkaJsonFetch } from './network'

/**
 * Resolves a registry name to its URL from the config's registries map.
 * @param name Registry name to look up.
 * @param registries Registries map from the Nka config.
 * @returns The resolved registry source.
 * @throws If the registry name is not configured.
 */
export function resolveRegistrySource(name: string, registries: NkaConfig['registries']): ResolvedRegistrySource {
  const url = registries[name]

  if (!url) {
    throw new Error(`Registry "${name}" is not configured.`)
  }

  return { name, url }
}

/**
 * Fetches and validates a registry from a resolved source.
 * @param source The resolved registry source from {@link resolveRegistryUrl}.
 * @returns The validated registry and its source.
 * @throws If the fetch fails or the index is invalid.
 */
export async function fetchRegistry(source: ResolvedRegistrySource): Promise<Registry> {
  try {
    const registry = await nkaJsonFetch<Registry>(source.url)

    const [
      isValid,
      validationErrors,
    ] = Schema.Errors(RegistrySchema, registry)

    if (!isValid) {
      throw new Error(
        `Invalid registry from "${source.url}".`,
        {
          cause: JSON.stringify(validationErrors),
        },
      )
    }

    return registry
  } catch (error) {
    throw new Error(
      `Failed to fetch registry "${source.name}" from "${source.url}".`,
      {
        cause: error,
      },
    )
  }
}

/**
 * Creates a unique key for a registry item, used for Map lookups and deduplication.
 * @param type The item type (e.g., 'component', 'utility').
 * @param name The item name (e.g., 'button', 'styling').
 * @returns A composite key in the format `"type:name"`.
 */
function itemKey(type: string, name: string) {
  return `${type}:${name}`
}

/**
 * Resolves a single registry item and recursively collects its dependency tree.
 *
 * It looks up the item in the registry map, adds it to the appropriate
 * component or utility bucket, merges NPM package dependencies, and recurses
 * into any nested registry dependencies.
 * @param reference The item (name and type) to resolve.
 * @param registryMap Pre-built map of all available registry items keyed by `"type:name"`.
 * @param result Accumulator for the resolved components, utilities, and packages.
 * @param visited Set of processed item keys to prevent infinite loops.
 * @throws If the item cannot be found in the registry map.
 */
function resolveRegistryItem(reference: ItemBase, registryMap: Map<string, Item>, result: ResolvedRegistryItems, visited: Set<string>) {
  const key = itemKey(reference.type, reference.name)

  // Prevent infinite loops in circular or diamond dependencies
  if (visited.has(key)) return
  visited.add(key)

  // Retrieve the full item definition from our registry map
  const item = registryMap.get(key)
  if (!item) {
    throw new Error(`Registry item "${reference.name}" of type "${reference.type}" not found.`)
  }

  // Bucket the item by its specific type
  switch (item.type) {
    case 'component': {
      result.components.set(item.name, item)
      break
    }
    case 'utility': {
      result.utilities.set(item.name, item)
      break
    }
  }

  // Process package dependencies if the item type supports them
  if ('dependencies' in item && item.dependencies) {
    // Collect required NPM packages
    if (item.dependencies.packages) {
      for (const [
        name,
        version,
      ] of Object.entries(item.dependencies.packages)) {
        result.packages.set(name, version)
      }
    }

    // Recursively resolve registry dependencies
    if (item.dependencies.registry) {
      for (const dependency of item.dependencies.registry) {
        resolveRegistryItem(dependency, registryMap, result, visited)
      }
    }
  }
}

/**
 * Resolves a list of registry items and their full dependency trees.
 *
 * Collects each item and its transitive dependencies into a normalized
 * collection of components, utilities, and NPM packages.
 * @param items Array of registry items to resolve.
 * @param registry The fetched registry containing all available items.
 * @returns A collection of all required components, utilities, and packages.
 */
export function resolveRegistryItems(items: Array<ItemBase>, registry: Registry): ResolvedRegistryItems {
  const result: ResolvedRegistryItems = {
    components: new Map(),
    packages: new Map(),
    utilities: new Map(),
  }

  // Pre-build a map for O(1) lookup of available items
  const registryMap = new Map<string, Item>()
  for (const item of registry.items) {
    registryMap.set(itemKey(item.type, item.name), item)
  }

  // Track visited items across all root items to avoid redundant resolutions
  const visited = new Set<string>()

  // Resolve each root item; their nested dependencies are handled inside
  for (const item of items) {
    resolveRegistryItem(item, registryMap, result, visited)
  }

  return result
}
