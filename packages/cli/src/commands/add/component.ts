import { intro } from '@clack/prompts'
import { defineCommand } from 'citty'

/**
 * Adds a component to the user's project.
 * @returns The add component command.
 */
export function component() {
  return defineCommand({
    args: {
      name: {
        description: 'Name of component to add',
        required: true,
        type: 'positional',
        valueHint: 'Name of component',
      },
    },
    meta: {
      description: 'Add component',
      name: 'component',
    },
    async run(context) {
      intro(`Adding ${context.args.name}`)
    },
  })
}
