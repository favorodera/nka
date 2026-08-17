import fsExtra from 'fs-extra'
import { addDependency, removeDependency } from 'nypm'
import { join } from 'pathe'

/**
 * Installs a package if not already present.
 * @param name The name of the package to install.
 * @param version The version of the package to install.
 * @param message Optional progress callback.
 * @throws If the package fails to install.
 */
export async function installDependency(name: string, version: string, message?: (message: string) => void) {
  try {
    const cwd = process.cwd()
    const packageJSON = await fsExtra.readJson(join(cwd, 'package.json'))
    const installed = {
      ...packageJSON?.dependencies,
      ...packageJSON?.devDependencies,
    }

    if (Object.hasOwn(installed, name)) {
      message?.(`Package "${name}" already installed.`)
      return
    }

    message?.(`Installing ${name}@${version}`)
    await addDependency(`${name}@${version}`, { cwd, silent: true })
    message?.(`Package "${name}" installed.`)
  } catch (error) {
    throw new Error(`Failed to install package "${name}"`, { cause: error })
  }
}

/**
 * Uninstalls a package if present.
 * @param name The name of the package to uninstall.
 * @param message Optional progress callback.
 * @throws If the package fails to uninstall.
 */
export async function uninstallDependency(name: string, message?: (message: string) => void) {
  try {
    const cwd = process.cwd()
    const packageJSON = await fsExtra.readJson(join(cwd, 'package.json'))
    const installed = {
      ...packageJSON?.dependencies,
      ...packageJSON?.devDependencies,
    }

    if (!Object.hasOwn(installed, name)) {
      message?.(`Package "${name}" not installed.`)
      return
    }

    message?.(`Uninstalling ${name}`)
    await removeDependency(name, { cwd, silent: true })
    message?.(`Package "${name}" uninstalled.`)
  } catch (error) {
    throw new Error(`Failed to uninstall package "${name}"`, { cause: error })
  }
}
