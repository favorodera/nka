import fsExtra from 'fs-extra'
import { addDependency, removeDependency } from 'nypm'
import { join } from 'pathe'

/**
 * Installs a package if not already present.
 * @param name The name of the package to install.
 * @param version The version of the package to install.
 * @returns A message indicating the result of the installation.
 * @throws If the package fails to install.
 */
export async function installDependency(name: string, version: string) {
  try {
    const cwd = process.cwd()
    const packageJSON = await fsExtra.readJson(join(cwd, 'package.json'))
    const installed = {
      ...packageJSON?.dependencies,
      ...packageJSON?.devDependencies,
    }

    if (name in installed) {
      return `Package ${name} already installed.`
    }

    await addDependency(`${name}@${version}`, { cwd, silent: true })
    return `Package "${name}" installed.`
  } catch (error) {
    throw new Error(`Failed to install package "${name}"`, { cause: error })
  }
}

/**
 * Uninstalls a package if present.
 * @param name The name of the package to uninstall.
 * @returns A message indicating the result of the uninstallation.
 * @throws If the package fails to uninstall.
 */
export async function uninstallDependency(name: string) {
  try {
    const cwd = process.cwd()
    const packageJSON = await fsExtra.readJson(join(cwd, 'package.json'))
    const installed = {
      ...packageJSON?.dependencies,
      ...packageJSON?.devDependencies,
    }

    if (!(name in installed)) {
      return `Package ${name} not installed.`
    }

    await removeDependency(name, { cwd, silent: true })
    return `Package "${name}" uninstalled.`
  } catch (error) {
    throw new Error(`Failed to uninstall package "${name}"`, { cause: error })
  }
}
