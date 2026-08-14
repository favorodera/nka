import { describe, expect, it } from 'vitest'
import { resolveRegistryItems, resolveRegistrySource } from '../../../src/utils/registry'
import { getRegistryItem, nkaConfig, nkaRegistry } from '../../utils'

describe('resolveRegistrySource', () => {
  it('resolves a configured registry', () => {
    const registryKey = Object.keys(nkaConfig.registries)[0]
    const source = resolveRegistrySource(registryKey, nkaConfig.registries)

    expect(source).toStrictEqual({
      name: registryKey,
      url: nkaConfig.registries[registryKey as keyof typeof nkaConfig.registries],
    })
  })

  it('throws when registry is not configured', () => {
    expect(() => resolveRegistrySource('missing', nkaConfig.registries))
      .toThrow('Registry "missing" is not configured.')
  })
})

describe('resolveRegistryItems', () => {
  it('resolves a single component with no deps', () => {
    const button = getRegistryItem('button', 'component')

    const result = resolveRegistryItems(
      [
        {
          name: 'button',
          type: 'component',
        },
      ],
      nkaRegistry,
    )

    expect(result.components.size).toBe(1)
    expect(result.components.get('button')).toStrictEqual(button)
    expect(result.utilities.size).toBe(0)
    expect(result.packages.size).toBe(0)
  })

  it('collects package dependencies', () => {
    const icon = getRegistryItem('icon', 'component')

    const result = resolveRegistryItems(
      [
        {
          name: 'icon',
          type: 'component',
        },
      ],
      nkaRegistry,
    )

    expect(result.components.get('icon')).toStrictEqual(icon)
    expect(result.packages.get('@iconify/vue')).toBe('^5.0.1')
  })

  it('resolves transitive component dependencies', () => {
    const icon = getRegistryItem('icon', 'component')
    const proseCodeIcon = getRegistryItem('prose-code-icon', 'component')

    const result = resolveRegistryItems(
      [
        {
          name: 'prose-code-icon',
          type: 'component',
        },
      ],
      nkaRegistry,
    )

    expect(result.components.get('prose-code-icon')).toStrictEqual(proseCodeIcon)
    expect(result.components.get('icon')).toStrictEqual(icon)
    expect(result.packages.get('@iconify/vue')).toBe('^5.0.1')
  })

  it('resolves deep dependency trees without duplicates', () => {
    const result = resolveRegistryItems(
      [
        {
          name: 'prose-pre',
          type: 'component',
        },
      ],
      nkaRegistry,
    )

    const expectedKeys = [
      'prose-pre',
      'prose-code-icon',
      'icon',
      'button',
    ].toSorted()
    const actualKeys = [...result.components.keys()].toSorted()

    expect(actualKeys).toStrictEqual(expectedKeys)
    expect(result.packages.size).toBe(1)
  })

  it('resolves utility dependency chains', () => {
    const props = getRegistryItem('props', 'utility')
    const styling = getRegistryItem('styling', 'utility')

    const result = resolveRegistryItems(
      [
        {
          name: 'styling',
          type: 'utility',
        },
      ],
      nkaRegistry,
    )

    expect(result.utilities.get('styling')).toStrictEqual(styling)
    expect(result.utilities.get('props')).toStrictEqual(props)
    expect(result.components.size).toBe(0)
  })

  it('resolves multiple root items', () => {
    const button = getRegistryItem('button', 'component')
    const props = getRegistryItem('props', 'utility')
    const styling = getRegistryItem('styling', 'utility')

    const result = resolveRegistryItems(
      [
        {
          name: 'button',
          type: 'component',
        },
        {
          name: 'styling',
          type: 'utility',
        },
      ],
      nkaRegistry,
    )

    expect(result.components.get('button')).toStrictEqual(button)
    expect(result.utilities.get('styling')).toStrictEqual(styling)
    expect(result.utilities.get('props')).toStrictEqual(props)
  })

  it('throws when item is not in the registry', () => {
    expect(() => resolveRegistryItems(
      [
        {
          name: 'missing',
          type: 'component',
        },
      ],
      nkaRegistry,
    )).toThrow('Registry item "missing" of type "component" not found.')
  })
})
