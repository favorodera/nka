import { defineCommand, runMain } from 'citty'
import { VERSION } from './constants'

export * from './types'

const main = defineCommand({
  meta: { name: 'oderadocs', version: VERSION },
  subCommands: {},
})

runMain(main)
