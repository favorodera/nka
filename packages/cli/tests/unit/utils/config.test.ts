import { describe, expect, it } from 'vitest'
import { nkaConfig } from '#test-utils'
import { generateNkaConfigContent } from '@/utils/config'

describe('generateNkaConfigContent', () => {
  it('generates a valid Nka config module', () => {
    const content = generateNkaConfigContent(nkaConfig)

    expect(content).toMatchFileSnapshot('./__snapshots__/valid-nka-config.txt')
  })
})
