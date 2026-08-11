import { intro, note, outro, tasks } from '@clack/prompts'
import fsExtra from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { dirname, join, normalize } from 'pathe'
import { glob } from 'tinyglobby'
import Schema from 'typebox/schema'
import { parse as parseYaml } from 'yaml'
import { version } from '../package.json'
import { type Metadata, MetadataSchema } from '../ts-schemas/metadata'
import { RegistrySchema } from '../ts-schemas/registry'
import { type Item, ItemSchema } from '../ts-schemas/shared/item'

const __dirname = dirname(fileURLToPath(import.meta.url))

const REGISTRY_DIR = join(__dirname, '../src')
const REGISTRY_INDEX = join(REGISTRY_DIR, 'index.json')
const REGISTRY_METADATA = join(REGISTRY_DIR, 'metadata.json')
const PNPM_WORKSPACE = join(__dirname, '../../../pnpm-workspace.yaml')

const registryItems: Array<Item> = []

const metadataDependenciesRef = [
  'tailwindcss',
  '@tailwindcss/vite',
  '@vueuse/core',
  'tailwind-variants',
  'tailwind-merge',
  'reka-ui',
]
const metadata: Metadata & { $schema: string } = {
  $schema: '../json-schemas/metadata.json',
  baseUrl: `https://raw.githubusercontent.com/favorodera/nka/refs/heads/main/`,
  name: 'nka',
  version,
}

intro('Building registry')

await tasks([
  {
    async task(message) {
      message('Reading pnpm workspace yaml')
      const workspaceYaml = await fsExtra.readFile(PNPM_WORKSPACE, 'utf8')

      message('Parsing workspace yaml')
      const parsedYaml = parseYaml(workspaceYaml)

      message('Extracting dependencies')
      const vendorCatalog = parsedYaml.catalogs?.vendor || {}

      metadata.packages = {}

      for (const name of metadataDependenciesRef) {
        if (vendorCatalog[name]) {
          metadata.packages[name] = vendorCatalog[name]
        } else {
          throw new Error(`Dependency ${name} not found in workspace vendor catalog`)
        }
      }

      message('Saving metadata')
      await fsExtra.outputJSON(
        REGISTRY_METADATA,
        metadata,
        {
          spaces: 2,
        },
      )

      return 'Registry metadata built'
    },
    title: 'Building registry metadata',
  },

  {
    async task(message) {
      message('Scanning registry directories for registry items')
      const itemFiles = await glob('**/*.json', {
        absolute: true,
        cwd: REGISTRY_DIR,
        ignore: [
          '**/index.json',
          '**/metadata.json',
        ],
      })

      message(`Discovered ${itemFiles.length} registry items`)

      for (const itemFile of itemFiles) {
        message(`Reading ${normalize(itemFile)}`)

        const registryItem = await fsExtra.readJson(itemFile, {
          encoding: 'utf8',
        })

        message(`Validating ${normalize(itemFile)}`)

        const parsedRegistryItem = Schema.Parse(
          ItemSchema,
          registryItem,
        )

        registryItems.push(parsedRegistryItem)

        message(`Indexed ${parsedRegistryItem.type}:${parsedRegistryItem.name}`)
      }

      message('Validating registry metadata')
      const parsedMetadata = Schema.Parse(
        MetadataSchema,
        metadata,
      )

      message('Validating registry index')
      const parsedRegistryIndex = Schema.Parse(
        RegistrySchema,
        {
          $schema: '../json-schemas/registry.json',
          items: registryItems,
          metadata: parsedMetadata,
        },
      )

      message('Writing registry index')
      await fsExtra.outputJSON(
        REGISTRY_INDEX,
        parsedRegistryIndex,
        {
          encoding: 'utf8',
          spaces: 2,
        },
      )

      return 'Registry index built'
    },
    title: 'Building registry index',
  },
])

const itemTypesRef: Record<Item['type'], string> = {
  component: 'Components',
  template: 'Templates',
  utility: 'Utilities',
}

const summary = Object.entries(Object.groupBy(registryItems, item => item.type))
  .map(([
    type,
    items,
  ]) => {
    const title = itemTypesRef[type as Item['type']] ?? type
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

outro('Registry built')
