import { intro, tasks } from '@clack/prompts'
import fsExtra from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'pathe'
import { glob } from 'tinyglobby'
import Schema from 'typebox/schema'

import type { RegistryItemReference } from '../schemas/ts-schemas/shared/reference'
import { RegistryItemSchema } from '../schemas/ts-schemas/shared/item'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REGISTRY_DIR = join(__dirname, '../src')
// const REGISTRY_OUTPUT = join(REGISTRY_DIR, 'index.json')

const registryItems: Array<RegistryItemReference> = []

intro('Registry builder')

await tasks([
  {
    async task(message) {
      const entriesFiles = await glob('**/*.json', {
        absolute: true,
        cwd: REGISTRY_DIR,
        ignore: ['**/index.json'],
      })

      message(`Found ${entriesFiles.length} registry entries`)

      message(`Processing ${entriesFiles.length} registry entries`)

      for (const entryFile of entriesFiles) {
        const registryItem = await fsExtra.readJson(
          entryFile,
          { encoding: 'utf8' },
        )

        const parsedRegistryItem = Schema.Parse(RegistryItemSchema, registryItem)

        registryItems.push({
          name: parsedRegistryItem.name,
          type: parsedRegistryItem.type,
        })
      }

      return `${entriesFiles.length} registry entries found and processed`
    },
    title: 'Scanning for registry entries',
  },
])
