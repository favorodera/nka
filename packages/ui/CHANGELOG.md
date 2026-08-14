# Changelog

## v0.0.1-alpha.2...v0.0.1

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.2...v0.0.1)

### Styling

- Format json files and release workflow ([63778f0](https://github.com/favorodera/nka/commit/63778f0))

  - collapse single-item arrays onto one line in json
  - remove extra spaces in release workflow commands

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.2...v0.0.1

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.2...v0.0.1)

### Styling

- Format json files and release workflow ([63778f0](https://github.com/favorodera/nka/commit/63778f0))

  - collapse single-item arrays onto one line in json
  - remove extra spaces in release workflow commands

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.1...v0.0.1-alpha.2

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.1...v0.0.1-alpha.2)

### Styling

- Format json files and test indentation ([3f0d791](https://github.com/favorodera/nka/commit/3f0d791))

  - Format package.json files and json schemas
  - Fix indentation in registry unit tests

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.0...v0.0.1-alpha.1

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.0...v0.0.1-alpha.1)

### Refactors

- **core:** Move binary entry and pin registry ([3e8d83d](https://github.com/favorodera/nka/commit/3e8d83d))

  - Move binary executable from cli to core package
  - Use version tags for registry URLs
  - Reorganize workspace and registry dependencies

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.0...v0.0.1-alpha.0

[compare changes](https://github.com/favorodera/nka/compare/09f9d763b05a9109bb65c876921d626abfd6d0e9...v0.0.1-alpha.0)

### Added

- **storybook:** Initialize storybook application ([6c148b3](https://github.com/favorodera/nka/commit/6c148b3))

  - Add Storybook app to preview UI components
  - Export theme and prose CSS for external styling
  - Replace heading components with code pre block

- **ui:** Add button, icon, and prose components ([3f594ff](https://github.com/favorodera/nka/commit/3f594ff))

  - Add Button, Icon, and ProsePre UI components
  - Replace basic Pre component with ProsePre
  - Support filename and copy features in ProsePre
  - Export new components in packages/ui

- **registry:** Add build script and schema updates ([d885560](https://github.com/favorodera/nka/commit/d885560))

  - Add build-registry script to parse registry entries
  - Support UtilitySchema in RegistryItemSchema
  - Update package dependencies and scripts

- **cli:** Rewrite registry imports based on config ([cf332b4](https://github.com/favorodera/nka/commit/cf332b4))

  - Add utility to rewrite registry package imports
  - Update installer to apply import rewrites
  - Standardize UI prose code icon import syntax


### Refactors

- **ui:** Replace components with ui package ([c1ff3c8](https://github.com/favorodera/nka/commit/c1ff3c8))

  - Rename components package to ui
  - Add initial UI setup and heading component
  - Configure Tailwind theme and build tooling

- Rename project from OderaDocs to Nka ([5737fd8](https://github.com/favorodera/nka/commit/5737fd8))

  - Update package names to @nka scope
  - Prefix CSS theme variables with nka-
  - Update repo URLs and documentation links

- **ui:** Use canonical @nka/* path imports ([364a43d](https://github.com/favorodera/nka/commit/364a43d))

  - Add @nka/* path aliases to tsconfig and Vite
  - Update UI component imports to use @nka/* paths
  - Update contributing guidelines for Nka project
  - Add package badges to README


### Chores

- Fix formatting and update typecheck script ([db8facd](https://github.com/favorodera/nka/commit/db8facd))

  - Use vue-tsc for UI package typechecking
  - Simplify storybook layout markup
  - Fix code formatting and indentation issues

- **scripts:** Remove prepublishOnly hooks ([f8e1113](https://github.com/favorodera/nka/commit/f8e1113))

  - Remove redundant prepublishOnly lifecycle scripts
  - Include prebuild tasks directly in registry build

- **scripts:** Add prepublishOnly hooks for packages ([039dead](https://github.com/favorodera/nka/commit/039dead))

  - Add prepublishOnly scripts to ensure build on publish
  - Configure turbo pipeline for prepublishOnly
  - Move registry asset generation to prebuild hook

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))
