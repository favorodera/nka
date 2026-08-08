import type { NkaConfig } from '../types/config'
import { NKA_CONFIG_DEFAULTS } from '../constants'

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
