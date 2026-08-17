import type { NkaConfig } from '../types'

/**
 * Rewrites Nka registry imports to the user's configured import aliases.
 *
 * Only imports using the internal Nka registry namespaces are rewritten.
 * All external and relative imports are left unchanged.
 * @param content Source file content.
 * @param config Nka project configuration.
 * @returns Source content with Nka registry imports rewritten.
 */
export function rewriteImports(content: string, config: Pick<NkaConfig, 'components' | 'utils'>): string {
  return content
    .replaceAll(
      /(['"])@nka\/components\/([^'"]+)\1/g,
      (_, quote, path) => `${quote}${config.components.import}/${path}${quote}`,
    )
    .replaceAll(
      /(['"])@nka\/utils\/([^'"]+)\1/g,
      (_, quote, path) => `${quote}${config.utils.import}/${path}${quote}`,
    )
}
