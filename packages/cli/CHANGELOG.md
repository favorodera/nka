# Changelog

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


### Chores

- **registry:** Bump version to 0.0.1-alpha.1 ([e2fdc0b](https://github.com/favorodera/nka/commit/e2fdc0b))

  - Remove placeholder test from CLI package
  - Update registry metadata base URL and version


### Tests

- **cli:** Add unit tests for file system utilities ([09e3e7b](https://github.com/favorodera/nka/commit/09e3e7b))

  - add tests for resolveItemDirectory and path resolution
  - create test mock config helper for CLI tests

- **cli:** Add unit tests for registry utils ([df0dbdf](https://github.com/favorodera/nka/commit/df0dbdf))

  - Add unit tests for registry resolution functions
  - Update test registry fixtures with mock items
  - Add utility dependency to styling registry item


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

- **cli:** Replace shared package with cli package ([3d944e7](https://github.com/favorodera/nka/commit/3d944e7))

  - Add @oderadocs/cli package with core types
  - Remove deprecated @oderadocs/shared package
  - Update package references in core package
  - Add theme stylesheet to components package
  - Update pnpm catalog configuration for types

- **cli:** Initialize command structure and constants ([725e101](https://github.com/favorodera/nka/commit/725e101))

  - Setup CLI entry point and main citty command
  - Define version and GitHub API fetch constants
  - Add required runtime dependencies for CLI
  - Consolidate workspace dependencies into vendor catalog

- **registry:** Initialize @nka/registry package ([69f57d7](https://github.com/favorodera/nka/commit/69f57d7))

  - Add package setup, tsconfig, and tsdown configs
  - Add registry workspace dependencies to pnpm catalog
  - Update cli package.json publish config to public

- **registry:** Add JSON schema generation script ([519b274](https://github.com/favorodera/nka/commit/519b274))

  - Move TypeBox definitions to ts-schemas directory
  - Add script to generate JSON schemas from TypeBox
  - Include generated JSON schema files in source
  - Add dependencies for CLI prompt and file utilities

- **cli:** Add config loader utility ([d4ca7fa](https://github.com/favorodera/nka/commit/d4ca7fa))

  - Add loadNkaConfig to parse user configuration
  - Define DEFAULT_REGISTRY_INDEX constant

- **cli:** Add registry resolution utility ([4f150ad](https://github.com/favorodera/nka/commit/4f150ad))

  - Add default config constants for registries
  - Implement resolveRegistry helper in CLI utils
  - Add typebox dependency to CLI package

- **cli:** Add fetchRegistryIndex helper ([f6cbf0e](https://github.com/favorodera/nka/commit/f6cbf0e))

  - Fetch and validate registry index schema
  - Disable new-cap lint rule for TypeScript files

- **cli:** Add file system helper utilities ([430b8df](https://github.com/favorodera/nka/commit/430b8df))

  - Add helpers for safe dir and file creation
  - Add confirmation prompt for path overwrites

- **cli:** Add package management utilities ([705dc6d](https://github.com/favorodera/nka/commit/705dc6d))

  - Add helpers to install and uninstall dependencies
  - Enclose paths and URLs in quotes in CLI messages

- **cli:** Add custom fetch client instance ([96ba032](https://github.com/favorodera/nka/commit/96ba032))

  - Add ofetch client with retry and timeout rules
  - Standardize JSON accept headers for CLI requests

- **cli:** Add init command stub and fetch utils ([3389717](https://github.com/favorodera/nka/commit/3389717))

  - Add initial stub for CLI init command
  - Separate text and JSON fetch clients
  - Cache registry index to avoid extra fetches
  - Update config file constants for resolution

- **cli:** Implement init command for project setup ([b7216a3](https://github.com/favorodera/nka/commit/b7216a3))

  - Add interactive prompts for component/util setup
  - Generate Nka config file based on user choices
  - Create target directories and handle overwrites
  - Add executable binary entry point for CLI package

- **cli:** Add styles directory setup to init ([a05daa6](https://github.com/favorodera/nka/commit/a05daa6))

  - Prompt for styles directory during project init
  - Download default theme and prose stylesheets
  - Add styles configuration to project config type

- **cli:** Support registry deps in init command ([fc833ec](https://github.com/favorodera/nka/commit/fc833ec))

  - Add apps/playground workspace package
  - Install registry dependencies during project init
  - Refactor registry resolution and styling logic

- **cli:** Add "add" command and simplify metadata ([eb00c1b](https://github.com/favorodera/nka/commit/eb00c1b))

  - Add CLI "add" command to select registry items
  - Flatten registry metadata structure for baseUrl
  - Update init command to use new metadata schema

- **cli:** Support dynamic registry resolution ([81ce6f1](https://github.com/favorodera/nka/commit/81ce6f1))

  - Support dynamic registry lookup in init and add
  - Update config generator and default registries
  - Refactor registry fetch and type definitions

- **cli:** Enhance registry resolution and schemas ([1964722](https://github.com/favorodera/nka/commit/1964722))

  - Supports recursive dependency tree resolution
  - Improves JSON schemas for strict type validation
  - Updates CLI commands to use new registry structure
  - Refactors registry builder for full item indexing
  - Ensures consistent registry item and package mapping

- **cli:** Implement component installation and overwrite logic ([c4c0c62](https://github.com/favorodera/nka/commit/c4c0c62))

  - Add file overwrite checks before component installation
  - Prompt relative paths during overwrite confirmations
  - Implement installation path resolution for registry items

- **cli:** Support utility dependencies in init ([3e31995](https://github.com/favorodera/nka/commit/3e31995))

  - Nest packages and utilities under dependencies
  - Resolve and install required registry utilities

- **cli:** Add utility command ([da8ba21](https://github.com/favorodera/nka/commit/da8ba21))

  - Add utility command under add subcommand
  - Install package dependencies when adding items
  - Move item install logic to registry utils
  - Support progress callbacks in package installer

- **cli:** Rewrite registry imports based on config ([cf332b4](https://github.com/favorodera/nka/commit/cf332b4))

  - Add utility to rewrite registry package imports
  - Update installer to apply import rewrites
  - Standardize UI prose code icon import syntax

- **registry:** Add repository source to templates ([56f54c5](https://github.com/favorodera/nka/commit/56f54c5))

  - Replace files property with repository schema
  - Add repository schema definition using TypeBox
  - Add favorodera template to registry


### Refactors

- Rename project from OderaDocs to Nka ([5737fd8](https://github.com/favorodera/nka/commit/5737fd8))

  - Update package names to @nka scope
  - Prefix CSS theme variables with nka-
  - Update repo URLs and documentation links

- **cli:** Update NkaConfig structure ([01da5b5](https://github.com/favorodera/nka/commit/01da5b5))

  - separate component and utility configurations
  - add import path specifiers for alias rewriting

- Update CLI constants and clean registry ([dac134b](https://github.com/favorodera/nka/commit/dac134b))

  - Update raw GitHub URL constant and fetch headers
  - Add DOM lib to CLI tsconfig for HeadersInit type
  - Update config JSDoc examples to use utils
  - Remove unused Vitest tests and dependencies

- **registry:** Restructure schemas and build pipeline ([bc6daa9](https://github.com/favorodera/nka/commit/bc6daa9))

  - Relocate JSON and TypeScript schemas to package root
  - Extract vendor packages from pnpm workspace catalog
  - Add custom registries option to CLI configuration

- **cli:** Update registry base URL lookup ([b534a08](https://github.com/favorodera/nka/commit/b534a08))

  - fetch source base URL from registry metadata
  - make metadata required in registry schemas

- **cli:** Update add command and prompt copy ([1144278](https://github.com/favorodera/nka/commit/1144278))

  - Allow passing multiple component names to add
  - Streamline init command flow and descriptions
  - Format error outputs across utility functions

- **cli:** Internalize cwd and add utility task ([97c7bda](https://github.com/favorodera/nka/commit/97c7bda))

  - remove explicit cwd parameter from helper functions
  - install resolved utilities in component add command
  - update init command UI spinners and registry tasks

- **cli:** Safely check utilities length ([276f938](https://github.com/favorodera/nka/commit/276f938))

  - Prevent potential coercion issues with length check

- **cli:** Extract registry install helper ([88bbd03](https://github.com/favorodera/nka/commit/88bbd03))

  - Extract installRegistryItems to share install logic
  - Simplify init and add component task execution
  - Clean up CLI prompt text and error messages
  - Add prose-pre component definition to registry

- **cli:** Simplify import rewrite logic ([06f7b31](https://github.com/favorodera/nka/commit/06f7b31))

  - Use string replacement patterns instead of functions
  - Update JSDoc documentation for rewriteImports

- **registry:** Split registry dependencies ([4805d77](https://github.com/favorodera/nka/commit/4805d77))

  - Replace generic registry dependencies array
  - Categorize dependencies by components/utilities
  - Update CLI dependency resolution logic


### Chores

- Fix formatting and update typecheck script ([db8facd](https://github.com/favorodera/nka/commit/db8facd))

  - Use vue-tsc for UI package typechecking
  - Simplify storybook layout markup
  - Fix code formatting and indentation issues

- **build:** Update package build configs and scripts ([0daf801](https://github.com/favorodera/nka/commit/0daf801))

  - Enable minification in tsdown configurations
  - Add prebuild script for registry package schema generation

- **cli:** Add @nka/registry dependency ([994bc73](https://github.com/favorodera/nka/commit/994bc73))

  - Add @nka/registry workspace dependency to CLI
  - Configure tsdown to always bundle @nka/registry

- **cli:** Add ofetch dependency ([2027ce2](https://github.com/favorodera/nka/commit/2027ce2))

  - Add ofetch to vendor catalog and CLI dependencies

- **scripts:** Remove prepublishOnly hooks ([f8e1113](https://github.com/favorodera/nka/commit/f8e1113))

  - Remove redundant prepublishOnly lifecycle scripts
  - Include prebuild tasks directly in registry build

- **scripts:** Add prepublishOnly hooks for packages ([039dead](https://github.com/favorodera/nka/commit/039dead))

  - Add prepublishOnly scripts to ensure build on publish
  - Configure turbo pipeline for prepublishOnly
  - Move registry asset generation to prebuild hook

- **cli:** Add @types/fs-extra dev dependency ([8eaf115](https://github.com/favorodera/nka/commit/8eaf115))
- **registry:** Point default URLs to main branch ([f7b90ac](https://github.com/favorodera/nka/commit/f7b90ac))

  - Use main branch instead of version tags for registry

- Remove playground app and update init command ([6a8ef0b](https://github.com/favorodera/nka/commit/6a8ef0b))

  - Remove obsolete playground app directory
  - Add completion message to cli init command
  - Update lockfile with missing dependencies

- **cli:** Simplify default init prompt paths ([4dd72cb](https://github.com/favorodera/nka/commit/4dd72cb))

  - Remove /nka subfolder suffix from default paths

- **registry:** Remove template schema and support ([3934dff](https://github.com/favorodera/nka/commit/3934dff))

  - Remove template type schemas and registry items
  - Drop gitget dependency from cli package


### Styling

- Reformat JSON schemas and package files ([c2e8299](https://github.com/favorodera/nka/commit/c2e8299))

  - collapse single-item arrays onto single lines
  - adjust tsconfig formatting and trailing newlines

- Fix code formatting and remove semicolons ([481432a](https://github.com/favorodera/nka/commit/481432a))

  - Clean up unnecessary whitespace and semicolons

- **cli:** Fix formatting and trailing newlines ([2bdf65a](https://github.com/favorodera/nka/commit/2bdf65a))

  - Clean up extra whitespace and fix indentation
  - Add missing newline at end of files

- **registry:** Format JSON schemas and config types ([a08b0b3](https://github.com/favorodera/nka/commit/a08b0b3))
- **cli:** Format imports in init command ([9e4b9a9](https://github.com/favorodera/nka/commit/9e4b9a9))

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))
