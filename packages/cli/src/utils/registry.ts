import { type Item, type ItemBase, type Registry, RegistrySchema } from '@nka/registry'
import Schema from 'typebox/schema'
import type { NkaConfig, ResolvedRegistryItems, ResolvedRegistrySource } from '../types'
import { nkaJsonFetch } from './network'

/**
 * Resolves a registry name to its source from config.
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
 * Fetches and validates a registry.
 * @param source Resolved registry source.
 * @returns The validated registry.
 * @throws If the registry fetch or validation fails.
 */
export async function fetchAndValidateRegistry(source: ResolvedRegistrySource): Promise<Registry> {
  try {
    const registry = await nkaJsonFetch<Registry>(source.url)

    const [
      isValid,
      validationErrors,
    ] = Schema.Errors(RegistrySchema, registry)

    if (!isValid) {
      throw new Error(`Invalid registry from "${source.url}".`, {
        cause: JSON.stringify(validationErrors),
      })
    }

    return registry
  } catch (error) {
    throw new Error(`Failed to fetch registry "${source.name}" from "${source.url}".`, {
      cause: error,
    })
  }
}

/**
 * Creates a unique key for an item.
 * @param type Item type.
 * @param name Item name.
 * @returns The unique key.
 */
function itemKey(type: string, name: string) {
  return `${type}:${name}`
}

/**
 * Resolves one item and its transitive dependencies into the result.
 * @param reference Item to resolve.
 * @param registryMap Map of all registry items.
 * @param result The result object to populate.
 * @param visited Set of already visited item keys.
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

  // Recurse into dependencies
  if ('dependencies' in item && item.dependencies) {
    // First, add all required packages to the result map
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
 * Resolves items and their full dependency trees.
 * @param items Array of items to resolve.
 * @param registry The registry to resolve from.
 * @returns An object containing the resolved components, utilities, and packages.
 */
export function resolveRegistryItems(items: Array<ItemBase>, registry: Registry): ResolvedRegistryItems {
  const result: ResolvedRegistryItems = {
    components: new Map(),
    packages: new Map(),
    utilities: new Map(),
  }

  // Build a flat lookup map for efficient resolution
  const registryMap = new Map<string, Item>()
  for (const item of registry.items) {
    registryMap.set(itemKey(item.type, item.name), item)
  }

  // Track visited items to prevent infinite loops
  const visited = new Set<string>()

  // Process each item and its dependencies
  for (const item of items) {
    resolveRegistryItem(item, registryMap, result, visited)
  }

  return result
}
