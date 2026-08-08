import { type Registry, RegistrySchema } from '@nka/registry'
import Schema from 'typebox/schema'
import type { NkaConfig } from '../types/config'
import { NKA_CONFIG_DEFAULTS } from '../constants'
import { nkaJsonFetch } from './network'

let registryIndexCache: Registry | undefined

/**
 * Fetches and validates a registry index.
 * @param url URL of the registry index.
 * @returns The validated registry index.
 * @throws If the registry cannot be fetched or is invalid.
 */
export async function fetchRegistryIndex(url: string): Promise<Registry> {
  try {
    if (!registryIndexCache) {
      registryIndexCache = await nkaJsonFetch<Registry>(url)
    }

    const [
      isValid,
      validationErrors,
    ] = Schema.Errors(RegistrySchema, registryIndexCache)

    if (!isValid) {
      throw new Error(`Invalid registry index from "${url}".`, { cause: validationErrors })
    }

    return registryIndexCache
  } catch (error) {
    throw new Error(`Failed to fetch registry index from "${url}".`, { cause: error })
  }
}

/**
 * Resolves a registry from the user's configuration.
 *
 * When no registry name is provided, the default Nka registry is used.
 * @param registryName Name of the registry to resolve.
 * @param config User's Nka configuration.
 * @returns The resolved registry.
 * @throws If the requested registry is not configured.
 */
export function resolveRegistry(registryName: string | undefined, config: NkaConfig) {
  const name = registryName ?? Object.keys(NKA_CONFIG_DEFAULTS.registries)[0]

  if (!name) {
    throw new Error('No default Nka registry is configured.')
  }

  const index = registryName
    ? config.registries?.[registryName]
    : NKA_CONFIG_DEFAULTS.registries[name as keyof typeof NKA_CONFIG_DEFAULTS.registries]

  if (!index) {
    throw new Error(`Registry "${name}" is not configured.`)
  }

  return {
    index,
    name,
  }
}
