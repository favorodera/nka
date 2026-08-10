import { type Registry, RegistrySchema } from '@nka/registry'
import Schema from 'typebox/schema'
import type { ResolvedRegistry } from '../types/registry'
import { DEFAULT_REGISTRY_NAME, NKA_CONFIG_DEFAULTS } from '../constants'
import { nkaJsonFetch } from './network'

/**
 * Resolves a registry source by name.
 *
 * When no name is provided, the built-in Nka registry is used.
 * @param name Registry name.
 * @returns The resolved registry source.
 * @throws If the requested registry is not configured.
 */
export function resolveRegistry(name = DEFAULT_REGISTRY_NAME): ResolvedRegistry {
  const indexUrl = NKA_CONFIG_DEFAULTS.registries?.[name as keyof typeof NKA_CONFIG_DEFAULTS.registries]

  if (!indexUrl) {
    throw new Error(`Registry "${name}" is not configured.`)
  }

  return {
    indexUrl,
    name,
  }
}

/**
 * Fetches and validates a registry index.
 *
 * When no registry name is provided, the built-in Nka registry is used.
 * @param name Registry name.
 * @returns The validated registry index and its source.
 * @throws If the registry cannot be fetched or is invalid.
 */
export async function fetchRegistryIndex(name = DEFAULT_REGISTRY_NAME): Promise<{ content: Registry, source: ResolvedRegistry }> {
  const source = resolveRegistry(name)

  try {
    const registryIndex = await nkaJsonFetch<Registry>(source.indexUrl)

    const [
      isValid,
      validationErrors,
    ] = Schema.Errors(RegistrySchema, registryIndex)

    if (!isValid) {
      throw new Error(`Invalid registry index from "${source.indexUrl}".`, {
        cause: JSON.stringify(validationErrors),
      })
    }

    return { content: registryIndex, source }
  } catch (error) {
    throw new Error(`Failed to fetch registry "${source.name}" from "${source.indexUrl}".`, {
      cause: error
    })
  }
}
