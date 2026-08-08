import { cancel, confirm, isCancel } from '@clack/prompts'
import fsExtra from 'fs-extra'

/**
 * Creates a directory and any necessary parent directories.
 * @param path The directory path to create.
 * @throws If the directory cannot be created.
 */
export async function createDirectory(path: string) {
  try {
    await fsExtra.ensureDir(path)
  } catch (error) {
    throw new Error(`Failed to create directory "${path}"`, { cause: error })
  }
}

/**
 * Writes content to a file, creating parent directories if they don't exist.
 * @param path The file path to write to.
 * @param content The content to write to the file.
 * @throws If the file cannot be written to.
 */
export async function writeToFile(path: string, content: string) {
  try {
    await fsExtra.outputFile(path, content, 'utf8')
  } catch (error) {
    throw new Error(`Failed to write path "${path}"`, { cause: error })
  }
}

/**
 * Prompts the user to confirm before overwriting an existing path.
 * @param path The absolute path to the file or directory to potentially overwrite.
 * @returns Whether the user wants to overwrite the file.
 */
export async function confirmOverwrite(path: string) {
  const pathExists = await fsExtra.pathExists(path)

  // If file doesn't exist, return true as there is nothing to overwrite
  if (!pathExists) {
    return true
  }

  const answer = await confirm({
    initialValue: false,
    message: `Path "${path}" already exists. Overwrite?`,
  })

  if (isCancel(answer)) {
    cancel('Operation cancelled by user.')
    process.exit(0)
  }

  return answer
}
