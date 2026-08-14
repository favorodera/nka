# Changelog

## v0.0.1-alpha.6...v0.1.0-alpha.0

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.6...v0.1.0-alpha.0)

### Added

- **ui:** Add pagination component boilerplate ([1c1d8a7](https://github.com/favorodera/nka/commit/1c1d8a7))

  - Add base Tailwind variants for pagination
  - Define types for pagination component props

- **pagination:** Export missing component prop types ([675be7e](https://github.com/favorodera/nka/commit/675be7e))

### Refactors

- **pagination:** Remove unused prop types ([e6852e5](https://github.com/favorodera/nka/commit/e6852e5))

### Documentation

- Update package descriptions across repository ([b293944](https://github.com/favorodera/nka/commit/b293944))

  - Update description texts for clarity and consistency
  - Add JSDoc comments to test utility exports


### Chores

- **ci:** Fetch git tags during release checkout ([b491491](https://github.com/favorodera/nka/commit/b491491))
- **ci:** Simplify release workflow into single job ([ff153b8](https://github.com/favorodera/nka/commit/ff153b8))

  - Consolidate bump, publish, release, and cleanup
  - Eliminate temporary release branch logic

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.6...v0.0.5

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.6...v0.0.5)

### Added

- **ui:** Add pagination component boilerplate ([1c1d8a7](https://github.com/favorodera/nka/commit/1c1d8a7))

  - Add base Tailwind variants for pagination
  - Define types for pagination component props

- **pagination:** Export missing component prop types ([675be7e](https://github.com/favorodera/nka/commit/675be7e))

### Refactors

- **pagination:** Remove unused prop types ([e6852e5](https://github.com/favorodera/nka/commit/e6852e5))

### Documentation

- Update package descriptions across repository ([b293944](https://github.com/favorodera/nka/commit/b293944))

  - Update description texts for clarity and consistency
  - Add JSDoc comments to test utility exports


### Chores

- **ci:** Fetch git tags during release checkout ([b491491](https://github.com/favorodera/nka/commit/b491491))
- **ci:** Simplify release workflow into single job ([ff153b8](https://github.com/favorodera/nka/commit/ff153b8))

  - Consolidate bump, publish, release, and cleanup
  - Eliminate temporary release branch logic

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.3...v0.0.4

[compare changes](https://github.com/favorodera/nka/compare/v0.0.3...v0.0.4)

### Documentation

- Update package descriptions across repository ([b293944](https://github.com/favorodera/nka/commit/b293944))

  - Update description texts for clarity and consistency
  - Add JSDoc comments to test utility exports

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1...v0.0.3

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1...v0.0.3)

### Added

- **ui:** Add pagination component boilerplate ([1c1d8a7](https://github.com/favorodera/nka/commit/1c1d8a7))

  - Add base Tailwind variants for pagination
  - Define types for pagination component props

- **pagination:** Export missing component prop types ([675be7e](https://github.com/favorodera/nka/commit/675be7e))

### Refactors

- **pagination:** Remove unused prop types ([e6852e5](https://github.com/favorodera/nka/commit/e6852e5))

### Chores

- **ci:** Simplify release workflow into single job ([ff153b8](https://github.com/favorodera/nka/commit/ff153b8))

  - Consolidate bump, publish, release, and cleanup
  - Eliminate temporary release branch logic

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1...v0.0.2

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1...v0.0.2)

### Added

- **ui:** Add pagination component boilerplate ([1c1d8a7](https://github.com/favorodera/nka/commit/1c1d8a7))

  - Add base Tailwind variants for pagination
  - Define types for pagination component props

- **pagination:** Export missing component prop types ([675be7e](https://github.com/favorodera/nka/commit/675be7e))

### Chores

- **ci:** Simplify release workflow into single job ([ff153b8](https://github.com/favorodera/nka/commit/ff153b8))

  - Consolidate bump, publish, release, and cleanup
  - Eliminate temporary release branch logic

### ❤️ Contributors

- Favour Emeka <favorodera@gmail.com>


## v0.0.1-alpha.6...v0.0.1

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.6...v0.0.1)

### Chores

- **ci:** Fetch git tags during release checkout ([b491491](https://github.com/favorodera/nka/commit/b491491))

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.5...v0.0.1-alpha.6

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.5...v0.0.1-alpha.6)

### Chores

- **ci:** Remove automated release PR step ([ade0590](https://github.com/favorodera/nka/commit/ade0590))

  - Remove create-pr job from release workflow
  - Simplify bump job display name

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.2...v0.0.1-alpha.5

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.2...v0.0.1-alpha.5)

### Fixed

- **release:** Pass prerelease flag to provider ([280fb4d](https://github.com/favorodera/nka/commit/280fb4d))

  - Pass provider release arguments to Relizy CLI
  - Add validate job output to github release step

- **ci:** Handle prerelease publishing in workflow ([a5e6694](https://github.com/favorodera/nka/commit/a5e6694))

  - Avoid Relizy graduating prereleases to stable
  - Use pnpm publish directly for prerelease tags
  - Pass confirmation flag to relizy commands
  - Reorder cleanup and PR creation jobs

- **ci:** Specify provider in release workflow ([5dae38b](https://github.com/favorodera/nka/commit/5dae38b))

  - Explicitly pass github provider to relizy release


### Chores

- **ci:** Add placeholder for release type ([177cf1b](https://github.com/favorodera/nka/commit/177cf1b))

  - Prevent unintended releases via default option
  - Require explicit version type selection

- **ci:** Split release workflow into distinct jobs ([b03c676](https://github.com/favorodera/nka/commit/b03c676))

  - Separate bump, npm publish, and GitHub release
  - Add registry schema generation before release
  - Remove registry prebuild script hook

- **ci:** Update release workflow prompt label ([be7994c](https://github.com/favorodera/nka/commit/be7994c))

  - Clarify input prompt for version bump type

- **ci:** Checkout release SHA in workflows ([b611899](https://github.com/favorodera/nka/commit/b611899))

  - Output exact release commit SHA from bump job
  - Checkout release SHA instead of tag in downstream
  - Push branch and tag separately to avoid sync bugs


### Styling

- Format json files and release workflow ([63778f0](https://github.com/favorodera/nka/commit/63778f0))

  - collapse single-item arrays onto one line in json
  - remove extra spaces in release workflow commands


### Continuous Integrations

- **release:** Use temporary branch and open PR ([5f97c7b](https://github.com/favorodera/nka/commit/5f97c7b))

  - Push release commits to a temporary branch
  - Open automated PR to main after publication
  - Clean up release branch and tags on failure

- **release:** Simplify relizy release command ([5f9748f](https://github.com/favorodera/nka/commit/5f9748f))

  - Remove redundant flags and provider arguments
  - Rely on default relizy configuration for release

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.2...v0.0.1-alpha.4

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.2...v0.0.1-alpha.4)

### Chores

- **ci:** Add placeholder for release type ([177cf1b](https://github.com/favorodera/nka/commit/177cf1b))

  - Prevent unintended releases via default option
  - Require explicit version type selection

- **ci:** Split release workflow into distinct jobs ([b03c676](https://github.com/favorodera/nka/commit/b03c676))

  - Separate bump, npm publish, and GitHub release
  - Add registry schema generation before release
  - Remove registry prebuild script hook

- **ci:** Update release workflow prompt label ([be7994c](https://github.com/favorodera/nka/commit/be7994c))

  - Clarify input prompt for version bump type

- **ci:** Checkout release SHA in workflows ([b611899](https://github.com/favorodera/nka/commit/b611899))

  - Output exact release commit SHA from bump job
  - Checkout release SHA instead of tag in downstream
  - Push branch and tag separately to avoid sync bugs


### Styling

- Format json files and release workflow ([63778f0](https://github.com/favorodera/nka/commit/63778f0))

  - collapse single-item arrays onto one line in json
  - remove extra spaces in release workflow commands

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))


## v0.0.1-alpha.2...v0.0.1-alpha.3

[compare changes](https://github.com/favorodera/nka/compare/v0.0.1-alpha.2...v0.0.1-alpha.3)

### Chores

- **ci:** Add placeholder for release type ([177cf1b](https://github.com/favorodera/nka/commit/177cf1b))

  - Prevent unintended releases via default option
  - Require explicit version type selection

- **ci:** Split release workflow into distinct jobs ([b03c676](https://github.com/favorodera/nka/commit/b03c676))

  - Separate bump, npm publish, and GitHub release
  - Add registry schema generation before release
  - Remove registry prebuild script hook


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

- **shared:** Initialize shared package ([a273cb9](https://github.com/favorodera/nka/commit/a273cb9))

  - Add `@oderadocs/shared` workspace package
  - Setup build, testing, and linting tooling
  - Export initial `DocsConfig` type definition

- **components:** Initialize component package ([475b470](https://github.com/favorodera/nka/commit/475b470))

  - Add initial H1 heading component and utils
  - Set up package build configuration and dependencies
  - Update workspace catalogs and shared config

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

- **cli:** Initialize command structure and constants ([725e101](https://github.com/favorodera/nka/commit/725e101))

  - Setup CLI entry point and main citty command
  - Define version and GitHub API fetch constants
  - Add required runtime dependencies for CLI
  - Consolidate workspace dependencies into vendor catalog

- **storybook:** Initialize storybook application ([6c148b3](https://github.com/favorodera/nka/commit/6c148b3))

  - Add Storybook app to preview UI components
  - Export theme and prose CSS for external styling
  - Replace heading components with code pre block

- **ui:** Add button, icon, and prose components ([3f594ff](https://github.com/favorodera/nka/commit/3f594ff))

  - Add Button, Icon, and ProsePre UI components
  - Replace basic Pre component with ProsePre
  - Support filename and copy features in ProsePre
  - Export new components in packages/ui

- **registry:** Initialize @nka/registry package ([69f57d7](https://github.com/favorodera/nka/commit/69f57d7))

  - Add package setup, tsconfig, and tsdown configs
  - Add registry workspace dependencies to pnpm catalog
  - Update cli package.json publish config to public

- **registry:** Add schemas for registry items ([73d2cb3](https://github.com/favorodera/nka/commit/73d2cb3))

  - Add TypeBox schemas for registry structure
  - Replace @sinclair/typebox with typebox package
  - Disable new-cap ESLint rule for schema files

- **registry:** Add template schemas ([6280ad2](https://github.com/favorodera/nka/commit/6280ad2))

  - Add schemas for repository and template items
  - Support template type in registry item schema

- **registry:** Add JSON schema generation script ([519b274](https://github.com/favorodera/nka/commit/519b274))

  - Move TypeBox definitions to ts-schemas directory
  - Add script to generate JSON schemas from TypeBox
  - Include generated JSON schema files in source
  - Add dependencies for CLI prompt and file utilities

- **registry:** Add build script and schema updates ([d885560](https://github.com/favorodera/nka/commit/d885560))

  - Add build-registry script to parse registry entries
  - Support UtilitySchema in RegistryItemSchema
  - Update package dependencies and scripts

- **registry:** Build registry index file ([f4fc933](https://github.com/favorodera/nka/commit/f4fc933))

  - Sort and write registry items to index.json
  - Export TypeScript types for registry schemas
  - Add detailed summary output to build script

- **registry:** Add metadata schema and items ([4174858](https://github.com/favorodera/nka/commit/4174858))

  - Add metadata schema for shared npm dependencies
  - Include metadata support in build process
  - Add icon, prose-code-icon, and styling items
  - Update component and utility file paths

- **registry:** Add name field to metadata schema ([84f098c](https://github.com/favorodera/nka/commit/84f098c))

  - Add required name property to metadata specs
  - Re-export schema definitions from entrypoint
  - Configure package for public NPM publishing

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


### Fixed

- **storybook:** Lint tailwind classes in Vue files ([9386d61](https://github.com/favorodera/nka/commit/9386d61))

  - Target Vue components instead of markdown files


### Refactors

- **ui:** Replace components with ui package ([c1ff3c8](https://github.com/favorodera/nka/commit/c1ff3c8))

  - Rename components package to ui
  - Add initial UI setup and heading component
  - Configure Tailwind theme and build tooling

- Rename project from OderaDocs to Nka ([5737fd8](https://github.com/favorodera/nka/commit/5737fd8))

  - Update package names to @nka scope
  - Prefix CSS theme variables with nka-
  - Update repo URLs and documentation links

- **cli:** Update NkaConfig structure ([01da5b5](https://github.com/favorodera/nka/commit/01da5b5))

  - separate component and utility configurations
  - add import path specifiers for alias rewriting

- **registry:** Reorganize schemas into shared ([762c7a4](https://github.com/favorodera/nka/commit/762c7a4))

  - Move common schema types to a shared directory
  - Update component and template item references
  - Make RegistryItemSchema a union of item types

- **registry:** Reorganize schemas and update structure ([272a338](https://github.com/favorodera/nka/commit/272a338))

  - Move schemas to dedicated schemas directory
  - Add utility schema definition and support
  - Update JSON schema generation paths
  - Add dependency definitions to button component

- **ui:** Use canonical @nka/* path imports ([364a43d](https://github.com/favorodera/nka/commit/364a43d))

  - Add @nka/* path aliases to tsconfig and Vite
  - Update UI component imports to use @nka/* paths
  - Update contributing guidelines for Nka project
  - Add package badges to README

- Update CLI constants and clean registry ([dac134b](https://github.com/favorodera/nka/commit/dac134b))

  - Update raw GitHub URL constant and fetch headers
  - Add DOM lib to CLI tsconfig for HeadersInit type
  - Update config JSDoc examples to use utils
  - Remove unused Vitest tests and dependencies

- **registry:** Restructure schemas and build pipeline ([bc6daa9](https://github.com/favorodera/nka/commit/bc6daa9))

  - Relocate JSON and TypeScript schemas to package root
  - Extract vendor packages from pnpm workspace catalog
  - Add custom registries option to CLI configuration

- **ci:** Simplify release workflow inputs ([0c57511](https://github.com/favorodera/nka/commit/0c57511))

  - Remove redundant mode input parameter
  - Derive release mode directly from bump type
  - Rename preid input to prerelease_id

- **registry:** Simplify JSON file output ([c4fdeb9](https://github.com/favorodera/nka/commit/c4fdeb9))

  - Use fsExtra.outputJSON to write JSON files
  - Remove redundant ensureFile calls

- **registry:** Simplify exports and schema types ([6a8e306](https://github.com/favorodera/nka/commit/6a8e306))

  - Use wildcard exports in index barrel file
  - Extract ItemNameSchema and ItemTypeSchema
  - Restrict registry dependencies to valid types

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


### Documentation

- **storybook:** Clean up markdown content examples ([c73a3ad](https://github.com/favorodera/nka/commit/c73a3ad))

  - Remove custom code block attributes
  - Remove obsolete definition lists section

- **contributing:** Add guidelines for contributors ([016044f](https://github.com/favorodera/nka/commit/016044f))

  - Add setup and development workflow steps
  - Define commit standards and PR process guidelines

- **registry:** Fix badge URLs in README ([bdb26e5](https://github.com/favorodera/nka/commit/bdb26e5))

  - fix badge links to use scoped package name

- **release:** Update prerelease_id description ([acb11a7](https://github.com/favorodera/nka/commit/acb11a7))
- **roadmap:** Add TASKS.md for documentation tasks ([b1b8069](https://github.com/favorodera/nka/commit/b1b8069))

### Chores

- **config:** Update build and workspace configs ([58d2a77](https://github.com/favorodera/nka/commit/58d2a77))

  - Enable isolatedDeclarations in shared package
  - Simplify tsdown build declaration options
  - Define peer dependency rules in pnpm workspace

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

- **storybook:** Configure tailwind import and linting ([524a90f](https://github.com/favorodera/nka/commit/524a90f))

  - Import tailwindcss in storybook assets
  - Ignore prose class in markdown lint rule

- **ci:** Update GitHub secret token name ([79e9b4e](https://github.com/favorodera/nka/commit/79e9b4e))

  - Use updated PAT secret in release workflow

- **cli:** Add ofetch dependency ([2027ce2](https://github.com/favorodera/nka/commit/2027ce2))

  - Add ofetch to vendor catalog and CLI dependencies

- **config:** Update relizy project settings ([b247994](https://github.com/favorodera/nka/commit/b247994))

  - Update project name to nka
  - Enable private packages inclusion in monorepo
  - Remove adapters from packages list

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

- **registry:** Update base URL to main branch ([2b9f2bd](https://github.com/favorodera/nka/commit/2b9f2bd))

  - Point source metadata URLs to main branch
  - Add missing core package dependency to lockfile

- Remove playground app and update init command ([6a8ef0b](https://github.com/favorodera/nka/commit/6a8ef0b))

  - Remove obsolete playground app directory
  - Add completion message to cli init command
  - Update lockfile with missing dependencies

- **cli:** Simplify default init prompt paths ([4dd72cb](https://github.com/favorodera/nka/commit/4dd72cb))

  - Remove /nka subfolder suffix from default paths

- **playground:** Add UI dependencies ([164e5db](https://github.com/favorodera/nka/commit/164e5db))

  - Add Tailwind, Reka UI, and VueUse to playground
  - Format JSON schemas in registry package

- **registry:** Remove template schema and support ([3934dff](https://github.com/favorodera/nka/commit/3934dff))

  - Remove template type schemas and registry items
  - Drop gitget dependency from cli package


### Styling

- Reformat JSON schemas and package files ([c2e8299](https://github.com/favorodera/nka/commit/c2e8299))

  - collapse single-item arrays onto single lines
  - adjust tsconfig formatting and trailing newlines

- **registry:** Format JSON schema arrays ([a64ef6e](https://github.com/favorodera/nka/commit/a64ef6e))

  - Format single-element arrays onto a single line.

- **registry:** Format schemas and rename type ([e305a2a](https://github.com/favorodera/nka/commit/e305a2a))

  - Reformat array syntax in registry JSON schemas
  - Rename WithSchema type alias to With$Schema

- Fix code formatting and remove semicolons ([481432a](https://github.com/favorodera/nka/commit/481432a))

  - Clean up unnecessary whitespace and semicolons

- **cli:** Fix formatting and trailing newlines ([2bdf65a](https://github.com/favorodera/nka/commit/2bdf65a))

  - Clean up extra whitespace and fix indentation
  - Add missing newline at end of files

- **registry:** Format JSON schemas and config types ([a08b0b3](https://github.com/favorodera/nka/commit/a08b0b3))
- **cli:** Format imports in init command ([9e4b9a9](https://github.com/favorodera/nka/commit/9e4b9a9))
- **registry:** Reformat JSON files for consistency ([9b55679](https://github.com/favorodera/nka/commit/9b55679))

  - Format single-line arrays across multiple lines

### ❤️ Contributors

- Favour Emeka ([@favorodera](https://github.com/favorodera))
