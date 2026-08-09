import { defineCommand, runMain } from 'citty'
import { version } from '../package.json'
import { init } from './commands/init'

export * from './types'

const main = defineCommand({
  meta: { name: 'nka', version },
  subCommands: {
    init,
  },
})

runMain(main)