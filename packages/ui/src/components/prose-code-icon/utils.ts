/**
 * Icon mappings for different programming languages.
 * @see https://icon-sets.iconify.design/vscode-icons/
 */
export const languageIconMap: Record<string, string> = {
  '.editorconfig': 'vscode-icons:file-type-editorconfig',
  '.env': 'vscode-icons:file-type-dotenv',
  '.env.example': 'vscode-icons:file-type-dotenv',
  '.eslintignore': 'vscode-icons:file-type-eslint',
  '.eslintrc': 'vscode-icons:file-type-eslint',
  '.eslintrc.cjs': 'vscode-icons:file-type-eslint',
  '.gitignore': 'vscode-icons:file-type-git',
  '.npmrc': 'vscode-icons:file-type-npm',
  '.nuxtignore': 'vscode-icons:file-type-nuxt',
  '.nuxtrc': 'vscode-icons:file-type-nuxt',
  '.vscode/settings.json': 'vscode-icons:file-type-vscode',
  'asm': 'vscode-icons:file-type-assembly',
  'bicep': 'vscode-icons:file-type-bicep',
  'bicepparam': 'vscode-icons:file-type-bicep',
  'bun': 'vscode-icons:file-type-bun',
  'cjs': 'vscode-icons:file-type-js',
  'cs': 'vscode-icons:file-type-csharp',
  'dart': 'vscode-icons:file-type-dartlang',
  'deno': 'vscode-icons:file-type-deno',
  'erl': 'vscode-icons:file-type-erlang',
  'eslint.config.cjs': 'vscode-icons:file-type-eslint',
  'eslint.config.js': 'vscode-icons:file-type-eslint',
  'eslint.config.mjs': 'vscode-icons:file-type-eslint',
  'exs': 'vscode-icons:file-type-elixir',
  'f': 'vscode-icons:file-type-fortran',
  'fs': 'vscode-icons:file-type-fsharp',
  'gleam': 'vscode-icons:file-type-gleam',
  'go': 'vscode-icons:file-type-go',
  'h': 'vscode-icons:file-type-cppheader',
  'hs': 'vscode-icons:file-type-haskell',
  'ico': 'vscode-icons:file-type-favicon',
  'ino': 'vscode-icons:file-type-arduino',
  'jl': 'vscode-icons:file-type-julia',
  'js': 'vscode-icons:file-type-js',
  'jsx': 'vscode-icons:file-type-js',
  'kt': 'vscode-icons:file-type-kotlin',
  'lsp': 'vscode-icons:file-type-lisp',
  'md': 'vscode-icons:file-type-markdown',
  'mjs': 'vscode-icons:file-type-js',
  'npm': 'vscode-icons:file-type-npm',
  'npx': 'vscode-icons:file-type-npm',
  'nuxt': 'vscode-icons:file-type-nuxt',
  'nuxt.config.js': 'vscode-icons:file-type-nuxt',
  'nuxt.config.ts': 'vscode-icons:file-type-nuxt',
  'nuxt.schema.ts': 'vscode-icons:file-type-nuxt',
  'package.json': 'vscode-icons:file-type-node',
  'pl': 'vscode-icons:file-type-perl',
  'plaintext': 'vscode-icons:file-type-text',
  'pnpm': 'vscode-icons:file-type-pnpm',
  'ps1': 'vscode-icons:file-type-powershell',
  'psd1': 'vscode-icons:file-type-powershell',
  'psm1': 'vscode-icons:file-type-powershell',
  'py': 'vscode-icons:file-type-python',
  'rb': 'vscode-icons:file-type-ruby',
  'rs': 'vscode-icons:file-type-rust',
  'sbt': 'vscode-icons:file-type-scala',
  'tailwind.config.js': 'vscode-icons:file-type-tailwind',
  'tailwind.config.ts': 'vscode-icons:file-type-tailwind',
  'terminal': 'lucide-terminal',
  'ts': 'vscode-icons:file-type-typescript',
  'tsconfig.json': 'vscode-icons:file-type-tsconfig',
  'tsx': 'vscode-icons:file-type-typescript',
  'vue': 'vscode-icons:file-type-vue',
  'yarn': 'vscode-icons:file-type-yarn',
  'yarn.lock': 'vscode-icons:file-type-yarn',
  'yml': 'vscode-icons:file-type-yaml',
}

/**
 * Resolves an icon from a filename.
 * Priority: basename → extension → fallback
 * @param filename The filename to resolve icon from
 * @returns The resolved icon ID or the plaintext fallback
 */
export function resolveIconFromFilename(filename?: string) {
  const candidates: Array<string> = []

  if (filename) {
    // 1. Remove any trailing parenthetical noise (e.g. "index.ts (1)" -> "index.ts")
    // 2. Extract just the file name from a full path (e.g. "src/utils/index.ts" -> "index.ts")
    // 3. Normalize to lowercase to ensure case-insensitive matching against the icon map
    const basename = filename
      .replace(/\s*\(.*\)\s*$/, '')
      .split('/')
      .pop()
      ?.toLowerCase()

    if (basename) {
      // Prioritize an exact match (useful for files like "package.json" or "tailwind.config.js")
      candidates.push(basename)

      // If there's an extension, use it as a fallback candidate (e.g. "ts" from "index.ts")
      const extension = basename.includes('.') ? basename.split('.').pop() : undefined
      if (extension) candidates.push(extension)
    }
  }

  // Iterate through our candidates (basename first, then extension) and return the first valid icon
  for (const key of candidates) {
    if (languageIconMap[key]) return languageIconMap[key]
  }

  // If no match was found, return a generic text icon
  return languageIconMap.plaintext
}
