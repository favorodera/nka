import type { Item } from '@nka/registry'
import { join } from 'pathe'
import { describe, expect, it } from 'vitest'
import { nkaConfig } from '#test-utils'
import { resolveItemDirectory, resolveItemInstallPath } from '@/utils/file-system'

describe('resolveItemDirectory', () => {
  it('returns components.dir for component', () => {
    expect(resolveItemDirectory('component', nkaConfig)).toBe('src/components')
  })

  it('returns utils.dir for utility', () => {
    expect(resolveItemDirectory('utility', nkaConfig)).toBe('src/utils')
  })

  it('throws for unsupported types', () => {
    expect(() => resolveItemDirectory('template' as 'component', nkaConfig))
      .toThrow('Cannot determine install directory')
  })
})

describe('resolveItemInstallPath', () => {
  const cwd = process.cwd()

  it('installs components into a named subdirectory', () => {
    const item: Item = {
      files: ['components/button/button.vue'],
      name: 'button',
      type: 'component',
    }

    const input = resolveItemInstallPath(
      item,
      'components/button/button.vue',
      nkaConfig,
    )

    const expected = join(cwd, 'src/components', 'button', 'button.vue')

    expect(input).toBe(expected)
  })

  it('installs utilities as flat files', () => {
    const item: Item = {
      files: ['utils/styling.ts'],
      name: 'styling',
      type: 'utility',
    }

    const input = resolveItemInstallPath(
      item,
      'utils/styling.ts',
      nkaConfig,
    )

    const expected = join(cwd, 'src/utils', 'styling.ts')

    expect(input).toBe(expected)
  })

  it('uses only the basename of the registry file path', () => {
    const item: Item = {
      files: ['components/icon/utils.ts'],
      name: 'icon',
      type: 'component',
    }

    const input = resolveItemInstallPath(
      item,
      'components/icon/utils.ts',
      nkaConfig,
    )

    const expected = join(cwd, 'src/components', 'icon', 'utils.ts')

    expect(input).toBe(expected)
  })
})
