import { intro, note, outro, tasks } from '@clack/prompts'
import fsExtra from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { dirname, join, normalize } from 'pathe'
import { glob } from 'tinyglobby'
import Schema from 'typebox/schema'
import { parse as parseYaml } from 'yaml'
import type { PackageDependencies } from '../ts-schemas/dependencies'
import { version } from '../package.json'
import { type Item, ItemSchema } from '../ts-schemas/item'
import { type Metadata, MetadataSchema } from '../ts-schemas/metadata'
import { RegistrySchema } from '../ts-schemas/registry'

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

const metadata = {
  $schema: '../json-schemas/metadata.json',
  baseUrl: `https://raw.githubusercontent.com/favorodera/nka/refs/tags/v${version}/`,
  dependencies: {
    packages: {} as PackageDependencies,
    utilities: [
      'styling',
      'props',
    ],
  },
  name: 'nka',
  version,
} satisfies Metadata & { $schema: string }

intro('Building registry')

await tasks([
  {
    async task(message) {
      message('Reading workspace')
      const workspaceYaml = await fsExtra.readFile(PNPM_WORKSPACE, 'utf8')
      const parsedYaml = parseYaml(workspaceYaml)
      const vendorCatalog = parsedYaml.catalogs?.vendor || {}

      metadata.dependencies.packages = {}

      for (const name of metadataDependenciesRef) {
        if (Object.hasOwn(vendorCatalog, name)) {
          metadata.dependencies.packages[name] = vendorCatalog[name]
        } else {
          throw new Error(`Dependency ${name} not found in workspace vendor catalog`)
        }
      }

      message('Writing metadata')
      await fsExtra.outputJSON(REGISTRY_METADATA, metadata, { spaces: 2 })

      return 'Metadata built'
    },
    title: 'Building metadata',
  },
  {
    async task(message) {
      message('Scanning items')
      const itemFiles = await glob('**/*.json', {
        absolute: true,
        cwd: REGISTRY_DIR,
        ignore: [
          '**/index.json',
          '**/metadata.json',
        ],
      })

      message(`Found ${itemFiles.length} items`)

      for (const itemFile of itemFiles) {
        message(`Indexing ${normalize(itemFile)}`)
        const registryItem = await fsExtra.readJson(itemFile, { encoding: 'utf8' })
        const parsed = Schema.Parse(ItemSchema, registryItem)
        registryItems.push(parsed)
      }

      const parsedMetadata = Schema.Parse(MetadataSchema, metadata)
      const parsedRegistry = Schema.Parse(RegistrySchema, {
        $schema: '../json-schemas/registry.json',
        items: registryItems,
        metadata: parsedMetadata,
      })

      message('Writing index')
      await fsExtra.outputJSON(REGISTRY_INDEX, parsedRegistry, {
        encoding: 'utf8',
        spaces: 2,
      })

      return 'Index built'
    },
    title: 'Building index',
  },
])

const itemTypesRef: Record<Item['type'], string> = {
  component: 'Components',
  utility: 'Utilities',
}

const summary = Object.entries(Object.groupBy(registryItems, item => item.type))
  .map(([
    type,
    items,
  ]) => {
    const title = itemTypesRef[type as Item['type']] ?? type
    const list = items.map(item => item.name).join('\n')
    return `${title} (${items.length})\n${list}`
  })
  .join('\n\n')

note(summary, `Registry summary (${registryItems.length} items)`)
outro('Registry built')
