import type { Item, Registry } from '@nka/registry'
import { basename } from 'pathe'
import type { NkaConfig } from '../types'
import { resolveItemInstallPath, writeToFile } from './file-system'
import { nkaTextFetch } from './network'

/**
 * Installs registry items by fetching and writing their files.
 * @param items Items to install.
 * @param registry Source registry.
 * @param config Nka config.
 * @param shouldWrite Overwrite decisions by target path.
 * @param message Progress callback.
 */
export async function installRegistryItems(items: Iterable<Item>, registry: Registry, config: NkaConfig, shouldWrite: Map<string, boolean>, message: (msg: string) => void) {
  for (const item of items) {
    message(`Installing ${item.name}`)

    switch (item.type) {
      case 'component':
      case 'utility': {
        for (const file of item.files) {
          const targetUrl = new URL(file, registry.metadata.baseUrl).href
          const targetPath = resolveItemInstallPath(item, file, config)

          if (shouldWrite.get(targetPath)) {
            message(`Fetching ${item.name} (${basename(file)})`)
            const content = await nkaTextFetch(targetUrl)

            message(`Writing ${item.name} (${basename(file)})`)
            await writeToFile(targetPath, content)
          }
        }
      }
    }
  }
}
