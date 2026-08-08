import { defineCommand } from 'citty'

/**
 * Command for initializing a new Nka project.
 * @returns Command that can be used to initialize a new Nka project.
 */
export function init() {
  return defineCommand({
    meta: {
      description: 'Initialize Nka project',
      name: 'init',
    },
    async run() {
      // const cwd = process.cwd()
      // const nkaConfigPath = join(cwd, NKA_CONFIG_FILE_NAME)
    },
  })
}
