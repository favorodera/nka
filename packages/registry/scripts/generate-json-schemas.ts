import { intro, note, outro, tasks } from '@clack/prompts'
import fsExtra from 'fs-extra'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'pathe'
import * as schemas from '../src/ts-schemas'

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

const schemaEntries = Object.entries(schemas).map(([
  name,
  schema,
]) => ({
  fileName: getJSONSchemaFileName(name),
  name,
  schema,
}))

await tasks(schemaEntries.map(entry => ({
  task: async () => {
    try {
      const filePath = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'json-schemas', entry.fileName)

      await fsExtra.ensureFile(filePath)
      await fsExtra.writeJson(filePath, entry.schema, {
        spaces: 2,
      })

      return `Generated ${entry.fileName}`
    } catch (error) {
      throw new Error(`Failed to generate JSON schemas for ${entry.name}`, { cause: error })
    }
  },
  title: `Generating ${entry.name}`,
})))

note(
  schemaEntries.map(entry => `  ${entry.fileName}`).join('\n'),
  `${schemaEntries.length} JSON schemas generated`,
)

outro('Generated JSON schemas successfully')
