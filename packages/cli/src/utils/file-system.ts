import type { Item } from '@nka/registry'
import { cancel, confirm, isCancel } from '@clack/prompts'
import fsExtra from 'fs-extra'
import { basename, join, relative } from 'pathe'
import type { NkaConfig } from '../types'

/**
 * Creates a directory and any necessary parent directories.
 * @param path Absolute directory path.
 * @throws If the directory cannot be created.
 */
export async function createDirectory(path: string) {
  try {
    await fsExtra.ensureDir(path)
  } catch (error) {
    throw new Error(
      `Failed to create directory "${path}".`,
      { cause: error },
    )
  }
}

/**
 * Writes content to a file, creating parent directories when necessary.
 * @param path Absolute file path.
 * @param content File content.
 * @throws If the file cannot be written.
 */
export async function writeToFile(path: string, content: string) {
  try {
    await fsExtra.outputFile(path, content, 'utf8')
  } catch (error) {
    throw new Error(
      `Failed to write file "${path}".`,
      { cause: error },
    )
  }
}

/**
 * Prompts the user before overwriting an existing path.
 * @param path Absolute path to check.
 * @param cwd Current working directory.
 * @returns Whether the path may be overwritten.
 */
export async function confirmOverwrite(path: string, cwd: string) {
  if (!await fsExtra.pathExists(path)) {
    return true
  }

  const answer = await confirm({
    initialValue: false,
    message: `Path "${relative(cwd, path)}" already exists. Overwrite?`,
  })

  if (isCancel(answer)) {
    cancel('Operation cancelled by user.')
    process.exit(0)
  }

  return answer
}

/**
 * Returns the configured installation directory for a registry item type.
 * @param type Registry item type.
 * @param config Nka configuration.
 * @returns Configured installation directory.
 */
export function resolveItemDirectory(
  type: Item['type'],
  config: NkaConfig,
) {
  switch (type) {
    case 'component': {
      return config.components.dir
    }

    case 'utility': {
      return config.utils.dir
    }

    default: {
      throw new Error(`Cannot determine installation directory for "${type}" items.`)
    }
  }
}

/**
 * Resolves the local installation path for a registry source file.
 *
 * The registry file path is relative to the registry source and is never
 * treated as the user's installation path directly.
 * @param item Registry item.
 * @param file Registry source file path.
 * @param config Nka configuration.
 * @param cwd Current working directory.
 * @returns Absolute local installation path.
 */
export function resolveItemInstallPath(
  item: Item,
  file: string,
  config: NkaConfig,
  cwd: string,
) {
  const directory = resolveItemDirectory(item.type, config)
  const fileName = basename(file)

  if (item.type === 'component') {
    return join(cwd, directory, item.name, fileName)
  }

  return join(cwd, directory, fileName)
}

/**
 * Checks whether registry items' targets already exist.
 *
 * Components use directory-level overwrite confirmation because a component
 * owns its installation directory. Utilities use file-level confirmation.
 * @param items Registry items.
 * @param config Nka configuration.
 * @param cwd Current working directory.
 * @returns Overwrite decisions keyed by local installation path.
 */
export async function confirmRegistryItemsOverwrites(
  items: Iterable<Item>,
  config: NkaConfig,
  cwd: string,
) {
  const decisions = new Map<string, boolean>()

  for (const item of items) {
    if (!('files' in item) || !item.files) continue

    if (item.type === 'component') {
      const directory = resolveItemDirectory(item.type, config)
      const itemDirectory = join(cwd, directory, item.name)

      // Prompt once per component directory
      const shouldOverwrite = await confirmOverwrite(itemDirectory, cwd)

      for (const file of item.files) {
        const targetPath = resolveItemInstallPath(item, file, config, cwd)
        decisions.set(targetPath, shouldOverwrite)
      }
    } else {
      // Prompt per file for utilities
      for (const file of item.files) {
        const targetPath = resolveItemInstallPath(item, file, config, cwd)
        decisions.set(
          targetPath,
          await confirmOverwrite(targetPath, cwd),
        )
      }
    }
  }

  return decisions
}
