import { intro, note, outro, tasks } from '@clack/prompts'
import fsExtra from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'pathe'
import { ComponentSchema } from '../ts-schemas/component'
import { MetadataSchema } from '../ts-schemas/metadata'
import { RegistrySchema } from '../ts-schemas/registry'
import { UtilitySchema } from '../ts-schemas/utility'

const schemas = {
  ComponentSchema,
  MetadataSchema,
  RegistrySchema,
  UtilitySchema,
}

/**
 * Generates a file name for a JSON schema.
 * @param schemaName The name of the schema.
 * @returns The file name.
 */
function getJSONSchemaFileName(schemaName: string) {
  return `${schemaName
    .replace(/Schema$/, '')
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()}.json`
}

intro('Generating JSON schemas')

const schemaEntries = Object.entries(schemas).map(([
  name,
  schema,
]) => ({
  fileName: getJSONSchemaFileName(name),
  name,
  schema,
}))

await tasks([
  {
    async task(message) {
      for (const { fileName, schema } of schemaEntries) {
        message(`Generating ${fileName}`)
        const filePath = join(dirname(fileURLToPath(import.meta.url)), '..', 'json-schemas', fileName)
        await fsExtra.outputJSON(filePath, schema, { spaces: 2 })
      }
      return 'Schemas generated'
    },
    title: 'Generating schemas',
  },
])

note(
  schemaEntries.map(({ fileName }) => `  ${fileName}`).join('\n'),
  `${schemaEntries.length} schemas generated`,
)
outro('Done')
