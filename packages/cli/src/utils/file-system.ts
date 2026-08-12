import type { Item } from '@nka/registry'
import { cancel, confirm, isCancel } from '@clack/prompts'
import fsExtra from 'fs-extra'
import { basename, join, relative } from 'pathe'
import type { NkaConfig } from '../types'

/**
 * Creates a directory and parents if needed.
 * @param path Path to the directory to create.
 * @throws If the directory cannot be created.
 */
export async function createDirectory(path: string) {
  try {
    await fsExtra.ensureDir(path)
  } catch (error) {
    throw new Error(`Failed to create directory "${path}".`, { cause: error })
  }
}

/**
 * Writes content to a file, creating parents if needed.
 * @param path Path to the file to write.
 * @param content Content to write to the file.
 * @throws Error if the file cannot be written.
 */
export async function writeToFile(path: string, content: string) {
  try {
    await fsExtra.outputFile(path, content, 'utf8')
  } catch (error) {
    throw new Error(`Failed to write file "${path}".`, { cause: error })
  }
}

/**
 * Prompts before overwriting an existing path.
 * @param path Path to the file or directory to overwrite.
 * @returns True if the user confirmed the overwrite, false otherwise.
 */
export async function confirmOverwrite(path: string) {
  if (!await fsExtra.pathExists(path)) {
    return true
  }

  const answer = await confirm({
    initialValue: false,
    message: `Overwrite "${relative(process.cwd(), path)}"?`,
  })

  if (isCancel(answer)) {
    cancel('Cancelled.')
    process.exit(0)
  }

  return answer
}

/**
 * Returns the install directory for an item type.
 * @param type The type of the item.
 * @param config The Nka configuration.
 * @returns The install directory for the item type.
 */
export function resolveItemDirectory(type: Item['type'], config: NkaConfig) {
  switch (type) {
    case 'component': {
      return config.components.dir
    }
    case 'utility': {
      return config.utils.dir
    }
    default: {
      throw new Error(`Cannot determine install directory for "${type}" items.`)
    }
  }
}

/**
 * Resolves the local install path for a registry file.
 * Components install into a named subdirectory; utilities install flat.
 * @param item The registry item.
 * @param file The file to install.
 * @param config The Nka configuration.
 * @returns The install path for the item file.
 */
export function resolveItemInstallPath(item: Item, file: string, config: NkaConfig) {
  const directory = resolveItemDirectory(item.type, config)
  const cwd = process.cwd()
  const fileName = basename(file)

  if (item.type === 'component') {
    return join(cwd, directory, item.name, fileName)
  }

  return join(cwd, directory, fileName)
}

/**
 * Collects overwrite decisions for registry items.
 * Components prompt once per directory; utilities prompt per file.
 * @param items The registry items to collect overwrite decisions for.
 * @param config The Nka configuration.
 * @returns A map of file paths to boolean overwrite decisions.
 */
export async function confirmRegistryItemsOverwrites(items: Iterable<Item>, config: NkaConfig) {
  const cwd = process.cwd()
  const decisions = new Map<string, boolean>()

  for (const item of items) {
    switch (item.type) {
      case 'component': {
        // Prompt once per component directory
        const itemDirectory = join(cwd, resolveItemDirectory(item.type, config), item.name)
        const shouldOverwrite = await confirmOverwrite(itemDirectory)

        for (const file of item.files) {
          decisions.set(resolveItemInstallPath(item, file, config), shouldOverwrite)
        }
        break
      }
      case 'utility': {
        // Prompt per file for utilities
        for (const file of item.files) {
          const targetPath = resolveItemInstallPath(item, file, config)
          decisions.set(targetPath, await confirmOverwrite(targetPath))
        }
        break
      }
    }
  }

  return decisions
}
