import { intro } from '@clack/prompts'
import { defineCommand } from 'citty'

/**
 * Adds a component from the Nka registry to the project.
 * @returns The Nka add component command.
 */
export function component() {
  return defineCommand({
  

    meta: {
      description: 'Add one or more components to the project',
      name: 'component',
    },
    async run({args}) {
      const componentNames = args._ as string[]
      const cwd = process.cwd()
    },
  })
}
