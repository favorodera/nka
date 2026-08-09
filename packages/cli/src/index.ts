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

// For internal live testing of the cli:
// - cd into bin folder: `cd packages/cli/bin`
// - run the script: `node nka.mjs <subcommand> <options>`
// Everything except the executable script in the bin folder is ignored by git.