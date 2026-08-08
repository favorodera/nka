import fsExtra from 'fs-extra'
import { addDependency, removeDependency } from 'nypm'
import { join } from 'pathe'

/**
 * Installs a package in the current project.
 * @param name The name of the package to install.
 * @param version The version of the package to install.
 * @param cwd The absolute path to the project root.
 * @returns A message indicating the result of the installation.
 * @throws If the package fails to install.
 */
export async function installDependency(name: string, version: string, cwd: string) {
  try {
    const packageJSONPath = join(cwd, 'package.json')

    const packageJSON = await fsExtra.readJson(packageJSONPath)

    const installedDependencies = {
      ...packageJSON?.dependencies,
      ...packageJSON?.devDependencies,
    }

    if (name in installedDependencies) {
      return `Package ${name} is already installed.`
    }

    const installationTarget = `${name}@${version}`

    await addDependency(installationTarget, {
      cwd,
      silent: true,
    })

    return `Package "${name}" installed successfully.`
  } catch (error) {
    throw new Error(`Failed to install package "${name}"`, { cause: error })
  }
}

/**
 * Uninstalls a package from the current project.
 * @param name The name of the package to uninstall.
 * @param cwd The absolute path to the project root.
 * @returns A message indicating the result of the uninstallation.
 * @throws If the package fails to uninstall.
 */
export async function uninstallDependency(name: string, cwd: string) {
  try {
    const packageJSONPath = join(cwd, 'package.json')

    const packageJSON = await fsExtra.readJson(packageJSONPath)

    const installedDependencies = {
      ...packageJSON?.dependencies,
      ...packageJSON?.devDependencies,
    }

    if (!(name in installedDependencies)) {
      return `Package ${name} is not installed.`
    }

    await removeDependency(name, {
      cwd,
      silent: true,
    })

    return `Package "${name}" uninstalled successfully.`
  } catch (error) {
    throw new Error(`Failed to uninstall package "${name}"`, { cause: error })
  }
}
