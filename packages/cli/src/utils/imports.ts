import type { NkaConfig } from '../types'

/**
 * Rewrites internal Nka registry imports to the user's configured aliases.
 * @param content Source file content.
 * @param config Nka project configuration.
 * @returns Content with Nka imports rewritten.
 */
export function rewriteImports(content: string, config: Pick<NkaConfig, 'components' | 'utils'>): string {
  return content
    .replaceAll(
      /(['"])@nka\/components\/([^'"]+)\1/g,
      (_, quote: string, path: string) => `${quote}${config.components.import}/${path}${quote}`,
    )
    .replaceAll(
      /(['"])@nka\/utils\/([^'"]+)\1/g,
      (_, quote: string, path: string) => `${quote}${config.utils.import}/${path}${quote}`,
    )
}
