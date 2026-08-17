# Contributing to Nka

Thank you for your interest in contributing to Nka.

Nka is an open-code documentation engine for the Vue ecosystem. Every contribution—whether it's fixing a bug, improving documentation, or implementing a new feature—helps move the project forward.

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 11+

### Setup

```bash
git clone https://github.com/favorodera/nka.git
cd nka

pnpm install
pnpm dev
```

### Repository Structure

```text
apps/
  storybook/          Internal component playground

packages/
  cli/                Command-line interface
  core/               Shared runtime utilities
  registry/           Registry source and schemas
  ui/                 Internal UI bundle for Storybook and examples
```

The `ui` package is an internal workspace package used to develop and validate the project. It is not intended to be consumed directly by applications.

## Development Workflow

Create a dedicated branch for your work.

| Pattern | Purpose |
| --- | --- |
| `feat/...` | New features |
| `fix/...` | Bug fixes |
| `docs/...` | Documentation |
| `refactor/...` | Refactoring |
| `chore/...` | Maintenance |

Nka follows the Conventional Commits specification.

Examples:

```text
feat(cli): resolve registry dependencies
fix(registry): validate repository schema
docs: improve installation guide
```

Before opening a pull request, ensure the project passes validation.

```bash
pnpm ready
```

## Architecture Guidelines

Nka is guided by a few core principles. Contributions should follow these principles whenever possible.

### Open Code

Registry items are copied into the user's project and become part of their codebase. Avoid introducing abstractions that prevent developers from understanding, modifying, or owning the generated source.

### Registry First

Everything installable should be represented as a registry item. This includes components, utilities, templates, themes, typesets, starters, and future installable resources.

### Vue Ecosystem

Nka is built for the Vue ecosystem. Shared packages should remain framework-agnostic, while framework-specific functionality belongs in adapters.

### Public APIs

Each registry module should expose a single public entry through its `index.ts`.

Prefer:

```ts
import { Button } from '@nka/components/button'
```

Instead of:

```ts
import Button from '@nka/components/button/button.vue'
```

Within the same registry module, use relative imports.

### Canonical Imports

Imports between registry modules should always use the reserved `@nka/*` namespaces.

```ts
import { Button } from '@nka/components/button'
import { normalizeClass } from '@nka/utils/styling'
```

These imports are rewritten by the CLI during installation according to the user's configuration.

### Keep It Simple

Prefer extending existing systems over introducing new ones. New configuration options should only be added when they solve a real problem and cannot be addressed through existing conventions.

## Pull Requests

Before submitting a pull request:

- Ensure `pnpm ready` passes.
- Update documentation when behavior changes.
- Add or update tests when introducing new functionality.
- Keep each pull request focused on a single concern.
- For significant architectural changes, open a discussion before implementation.

## Reporting Bugs

When reporting a bug, please include:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details

## Suggesting Features

Feature requests should explain:

- The problem being solved
- The proposed solution
- Alternative approaches that were considered

For larger proposals, please start a GitHub Discussion before implementation.

## Need Help?

If you're unsure about an implementation or architectural decision, open a GitHub Discussion before writing code.

Thanks for helping build Nka!