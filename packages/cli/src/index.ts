import { defineCommand, runMain } from 'citty'
import { version } from '../package.json'

export * from './types'

const main = defineCommand({
  meta: { name: 'nka', version },
  subCommands: {},
})

runMain(main)
