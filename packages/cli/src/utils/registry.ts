import { type Registry, RegistrySchema } from '@nka/registry'
import Schema from 'typebox/schema'
import type { FetchedRegistryIndex, NkaConfig, ResolvedRegistrySource } from '../types'
import { nkaJsonFetch } from './network'

/**
 * Resolves a registry name to its URL from the config's registries map.
 * @param name Registry name to look up.
 * @param registries Registries map from the Nka config.
 * @returns The resolved registry source.
 * @throws If the registry name is not configured.
 */
export function resolveRegistryUrl(name: string, registries: NkaConfig['registries']): ResolvedRegistrySource {
  const indexUrl = registries[name]

  if (!indexUrl) {
    throw new Error(`Registry "${name}" is not configured.`)
  }

  return { indexUrl, name }
}

/**
 * Fetches and validates a registry index from a resolved source.
 * @param source The resolved registry source from {@link resolveRegistryUrl}.
 * @returns The validated registry index and its source.
 * @throws If the fetch fails or the index is invalid.
 */
export async function fetchRegistryIndex(source: ResolvedRegistrySource): Promise<FetchedRegistryIndex> {
  try {
    const registryIndex = await nkaJsonFetch<Registry>(source.indexUrl)

    const [
      isValid,
      validationErrors,
    ] = Schema.Errors(RegistrySchema, registryIndex)

    if (!isValid) {
      throw new Error(
        `Invalid registry index from "${source.indexUrl}".`,
        {
          cause: JSON.stringify(validationErrors),
        },
      )
    }

    return { content: registryIndex, source }
  } catch (error) {
    throw new Error(
      `Failed to fetch registry "${source.name}" from "${source.indexUrl}".`,
      {
        cause: error,
      },
    )
  }
}
