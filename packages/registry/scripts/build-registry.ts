import { intro, note, outro, tasks } from '@clack/prompts'
import fsExtra from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { dirname, join, normalize } from 'pathe'
import { glob } from 'tinyglobby'
import Schema from 'typebox/schema'

import { version } from '../package.json'

import type { RegistryItemReference } from '../schemas/ts-schemas/shared/reference'
import { RegistryItemSchema } from '../schemas/ts-schemas/shared/item'

const __dirname = dirname(fileURLToPath(import.meta.url))

const REGISTRY_DIR = join(__dirname, '../src')
const REGISTRY_INDEX = join(REGISTRY_DIR, 'index.json')

const registryItems: Array<RegistryItemReference> = []

intro('Building registry')

await tasks([
  {
    title: 'Scanning registry',

    async task(message) {
      const itemFiles = await glob('**/*.json', {
        absolute: true,
        cwd: REGISTRY_DIR,
        ignore: ['**/index.json'],
      })

      message(`Discovered ${itemFiles.length} registry items`)

      for (const itemFile of itemFiles) {
        message(`Reading ${normalize(itemFile)}`)

        const registryItem = await fsExtra.readJson(itemFile, {
          encoding: 'utf8',
        })

        message(`Validating ${normalize(itemFile)}`)

        const parsedRegistryItem = Schema.Parse(
          RegistryItemSchema,
          registryItem,
        )

        registryItems.push({
          name: parsedRegistryItem.name,
          type: parsedRegistryItem.type,
        })

        message(`Indexed ${parsedRegistryItem.type}:${parsedRegistryItem.name}`)
      }

      return `Processed ${itemFiles.length} registry items`
    },
  },

  {
    title: 'Building registry index',

    async task(message) {
      message('Sorting registry items')

      registryItems.sort((itemA, itemB) => {
        if (itemA.type !== itemB.type) {
          return itemA.type.localeCompare(itemB.type)
        }

        return itemA.name.localeCompare(itemB.name)
      })

      message('Writing registry index')

      await fsExtra.writeJson(
        REGISTRY_INDEX,
        {
          $schema: '../schemas/json-schemas/registry.json',
          items: registryItems,
          version,
        },
        {
          encoding: 'utf8',
          spaces: 2,
        },
      )

      return `Generated index with ${registryItems.length} items`
    },
  },
])

const titles: Record<string, string> = {
  component: 'Components',
  theme: 'Themes',
  utility: 'Utilities',
}

const summary = Object.entries(Object.groupBy(registryItems, item => item.type))
  .map(([
    type,
    items,
  ]) => {
    const title = titles[type] ?? type
    const list = items
      .map(item => `${item.name}`)
      .join('\n')

    return `${title} (${items.length})\n${list}`
  })
  .join('\n\n')

note(
  summary,
  `Registry Summary (${registryItems.length} items)`,
)

outro('Registry built successfully')
