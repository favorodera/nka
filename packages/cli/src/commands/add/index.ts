import { defineCommand } from 'citty'
import { component } from './component'

/**
 * Adds a new registry item to the project.
 * @returns The Nka add command.
 */
export function add() {
  return defineCommand({
    meta: {
      description: 'Add registry item',
      name: 'add',
    },
    subCommands: {
      component,
    },
  })
}
