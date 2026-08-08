import { intro, note, outro, tasks } from '@clack/prompts'
import fsExtra from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'pathe'
import { ComponentSchema } from '../ts-schemas/component'
import { MetadataSchema } from '../ts-schemas/metadata'
import { RegistrySchema } from '../ts-schemas/registry'
import { TemplateSchema } from '../ts-schemas/template'
import { UtilitySchema } from '../ts-schemas/utility'

const schemas = {
  ComponentSchema,
  MetadataSchema,
  RegistrySchema,
  TemplateSchema,
  UtilitySchema,
}

/**
 * Generates a file name for a JSON schema.
 * @param schemaName The name of the schema.
 * @returns The file name.
 */
function getJSONSchemaFileName(schemaName: string) {
  const fileName = schemaName
    .replace(/Schema$/, '')
    .replaceAll(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()

  return `${fileName}.json`
}

intro('JSON schemas generator')

const schemaEntries = Object
  .entries(schemas)
  .map(([
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
      for (const { fileName, name, schema } of schemaEntries) {
        message(`Generating ${fileName}`)
        try {
          const filePath = join(dirname(fileURLToPath(import.meta.url)), '..', 'json-schemas', fileName)

          await fsExtra.outputJSON(filePath, schema, {
            spaces: 2,
          })

          message(`Generated ${fileName}`)
        } catch (error) {
          throw new Error(`Failed to generate JSON schema for ${name}`, { cause: error })
        }
      }

      return 'JSON schemas generated'
    },
    title: 'Generating JSON schemas',
  },
])

note(
  schemaEntries.map(entry => `  ${entry.fileName}`).join('\n'),
  `${schemaEntries.length} JSON schemas generated`,
)

outro('Done')
