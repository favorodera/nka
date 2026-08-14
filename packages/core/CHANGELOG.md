# Changelog

## v0.0.1-alpha.6...v0.0.2

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.6...v0.0.2)

### Documentation

- Update package descriptions across repository ([b293944](https://github.com/favorodera/nka/commit/b293944))

  - Update description texts for clarity and consistency
  - Add JSDoc comments to test utility exports

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.6...v0.1.0

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.6...v0.1.0)

### Documentation

- Update package descriptions across repository ([b293944](https://github.com/favorodera/nka/commit/b293944))

  - Update description texts for clarity and consistency
  - Add JSDoc comments to test utility exports

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.6...v0.0.6

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.6...v0.0.6)

### Documentation

- Update package descriptions across repository ([b293944](https://github.com/favorodera/nka/commit/b293944))

  - Update description texts for clarity and consistency
  - Add JSDoc comments to test utility exports

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.3...v0.0.5

[compare changes](https://github.com/favorodera/nka/compare/v0.0.3...v0.0.5)

### Documentation

- Update package descriptions across repository ([b293944](https://github.com/favorodera/nka/commit/b293944))

  - Update description texts for clarity and consistency
  - Add JSDoc comments to test utility exports

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.5...v0.0.1

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.5...v0.0.1)

No relevant changes for this release


## v0.0.1-alpha.2...v0.0.1

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.2...v0.0.1)

### Fixed

- **release:** Pass prerelease flag to provider ([280fb4d](https://github.com/favorodera/nka/commit/280fb4d))

  - Pass provider release arguments to Relizy CLI
  - Add validate job output to github release step

- **ci:** Handle prerelease publishing in workflow ([a5e6694](https://github.com/favorodera/nka/commit/a5e6694))

  - Avoid Relizy graduating prereleases to stable
  - Use pnpm publish directly for prerelease tags
  - Pass confirmation flag to relizy commands
  - Reorder cleanup and PR creation jobs


### Styling

- Format json files and release workflow ([63778f0](https://github.com/favorodera/nka/commit/63778f0))

  - collapse single-item arrays onto one line in json
  - remove extra spaces in release workflow commands


### Continuous Integrations

- **release:** Use temporary branch and open PR ([5f97c7b](https://github.com/favorodera/nka/commit/5f97c7b))

  - Push release commits to a temporary branch
  - Open automated PR to main after publication
  - Clean up release branch and tags on failure

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

### Refactors

- **cli:** Use json5 to format generated config ([9ae9b51](https://github.com/favorodera/nka/commit/9ae9b51))

  - Use json5 for robust config generation
  - Add unit tests for utils and imports
  - Update core cli entry point binary


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

- **core:** Initialize package and setup config ([b795b38](https://github.com/favorodera/nka/commit/b795b38))

  - Add @oderadocs/core package structure
  - Export defineOderaDocsConfig helper
  - Rename DocsConfig to OderaDocsConfig in shared

- **cli:** Replace shared package with cli package ([3d944e7](https://github.com/favorodera/nka/commit/3d944e7))

  - Add @oderadocs/cli package with core types
  - Remove deprecated @oderadocs/shared package
  - Update package references in core package
  - Add theme stylesheet to components package
  - Update pnpm catalog configuration for types


### Refactors

- Rename project from OderaDocs to Nka ([5737fd8](https://github.com/favorodera/nka/commit/5737fd8))

  - Update package names to @nka scope
  - Prefix CSS theme variables with nka-
  - Update repo URLs and documentation links


### Chores

- **build:** Update package build configs and scripts ([0daf801](https://github.com/favorodera/nka/commit/0daf801))

  - Enable minification in tsdown configurations
  - Add prebuild script for registry package schema generation

- **scripts:** Remove prepublishOnly hooks ([f8e1113](https://github.com/favorodera/nka/commit/f8e1113))

  - Remove redundant prepublishOnly lifecycle scripts
  - Include prebuild tasks directly in registry build

- **scripts:** Add prepublishOnly hooks for packages ([039dead](https://github.com/favorodera/nka/commit/039dead))

  - Add prepublishOnly scripts to ensure build on publish
  - Configure turbo pipeline for prepublishOnly
  - Move registry asset generation to prebuild hook

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))
