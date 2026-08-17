import { describe, expect, it } from 'vitest'
import type { NkaConfig } from '@/types'
import { nkaConfig } from '#test-utils'
import { rewriteImports } from '@/utils/imports'

describe('rewriteImports', () => {
  it('rewrites @nka/components imports', () => {
    const input = `import { Button } from '@nka/components/button'`
    const expected = `import { Button } from '@/components/button'`

    expect(rewriteImports(input, nkaConfig)).toBe(expected)
  })

  it('rewrites @nka/utils imports', () => {
    const input = `import { normalizeClass } from '@nka/utils/styling'`
    const expected = `import { normalizeClass } from '@/utils/styling'`

    expect(rewriteImports(input, nkaConfig)).toBe(expected)
  })

  it('handles double quotes', () => {
    const input = `import type { WithClass } from "@nka/utils/props"`
    const expected = `import type { WithClass } from "@/utils/props"`

    expect(rewriteImports(input, nkaConfig)).toBe(expected)
  })

  it('rewrites multiple imports in one file', () => {
    const input = [
      `import { Button } from '@nka/components/button'`,
      `import { Icon } from '@nka/components/icon'`,
      `import { normalizeClass } from '@nka/utils/styling'`,
    ].join('\n')

    const expected = [
      `import { Button } from '@/components/button'`,
      `import { Icon } from '@/components/icon'`,
      `import { normalizeClass } from '@/utils/styling'`,
    ].join('\n')

    expect(rewriteImports(input, nkaConfig)).toBe(expected)
  })

  it('leaves non-registry-spec-nka imports unchanged', () => {
    const input = [
      `import { ref } from 'vue'`,
      `import path from 'node:path'`,
      `import { foo } from './local'`,
      `import foo from '@nka/components-extra/foo'`,
      `import bar from '@nka/utils-extra/bar'`,
    ].join('\n')

    expect(rewriteImports(input, nkaConfig)).toBe(input)
  })

  it('uses any other custom aliases from config', () => {
    const custom = {
      components: {
        dir: 'lib/ui',
        import: '~/ui',
      },
      utils: {
        dir: 'lib/helpers',
        import: '#/helpers',
      },
    } as NkaConfig

    const input = [
      `import { X } from '@nka/components/x'`,
      `import { y } from '@nka/utils/y'`,
    ].join('\n')

    const expected = [
      `import { X } from '~/ui/x'`,
      `import { y } from '#/helpers/y'`,
    ].join('\n')

    expect(rewriteImports(input, custom)).toBe(expected)
  })

  it('preserves nested paths', () => {
    const input = `import { Foo } from '@nka/components/prose-code-icon/utils'`
    const expected = `import { Foo } from '@/components/prose-code-icon/utils'`

    expect(rewriteImports(input, nkaConfig)).toBe(expected)
  })
})
