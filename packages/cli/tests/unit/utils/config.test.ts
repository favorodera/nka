import { describe, expect, it } from 'vitest'
import { generateNkaConfigContent } from '../../../src/utils/config'
import { nkaConfig } from '../../utils'

describe('generateNkaConfigContent', () => {
  it('generates a valid Nka config module', () => {
    const content = generateNkaConfigContent(nkaConfig)

    expect(content).toMatchFileSnapshot('./__snapshots__/valid-nka-config.txt')
  })
})
