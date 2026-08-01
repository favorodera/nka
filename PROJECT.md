# OderaDocs — Project Vision & Implementation Roadmap

> **Mission:** Build an open-code documentation engine for the Vue ecosystem.

## Vision

OderaDocs is not a documentation theme, nor is it a static site generator.

It is an open-code documentation engine that provides the building blocks, tooling, and infrastructure required to create modern documentation experiences. Rather than hiding implementation details behind packages, OderaDocs installs source code directly into the developer's project, giving developers complete ownership and unlimited customization.

Built specifically for the Vue ecosystem, OderaDocs embraces existing tools instead of replacing them. Wherever mature solutions already exist, it integrates with them through adapters while focusing on what it does best: documentation primitives, theming, typesetting, registry-driven distribution, and developer tooling.

---

## Phase 1 — Foundation

### Objective

Establish a stable and extensible foundation that every future feature can build upon.

### Registry

The registry is the heart of OderaDocs and serves as the distribution mechanism for every installable feature.

#### Responsibilities

* Define the registry specification
* Implement registry manifests
* Resolve registry dependencies
* Resolve npm dependencies
* Support versioned releases
* Provide GitHub Raw Content registry support
* Validate registry items

The registry specification should remain stable and backwards compatible wherever possible, as every other part of the project depends on it.

### Configuration

Configuration should remain intentionally minimal.

#### Initial configuration

* Components directory
* Theme CSS output path
* Typeset CSS output path

Framework adapters may extend this configuration with adapter-specific options when necessary.

### CLI

The CLI is the primary interface for interacting with OderaDocs.

#### Commands

* `init`
* `add`
* `remove`

#### Responsibilities

* Resolve registry items
* Resolve registry dependencies
* Resolve npm dependencies
* Download registry files
* Install source files
* Install package dependencies
* Generate configuration
* Install starter templates

Every installation should pass through a single installation pipeline to ensure consistent behavior across the ecosystem.

### Core

The core package provides shared infrastructure across the ecosystem.

#### Responsibilities

* Shared types
* Registry client
* Configuration management
* Shared utilities
* Common composables
* Helper functions

The core package should never depend on framework-specific APIs such as Nuxt or VitePress.

---

## Phase 2 — Documentation Experience

### Theme

The theme system is responsible solely for presentation.

#### Responsibilities

* Design tokens
* CSS variables
* Color system
* Border radius
* Shadows
* Motion
* Theme CSS generation

Themes should never modify component behavior or business logic.

### Typeset

The Typeset engine provides a unified presentation layer for documentation content.

#### Responsibilities

* Typography
* Heading hierarchy
* Tables
* Lists
* Images
* Quotes
* Footnotes
* Code blocks
* Reading width
* Responsive spacing

Typeset should provide consistent styling regardless of the content source.

### Components

Develop the core documentation primitives distributed as open-code registry items.

#### Initial components

* Alert
* Tabs
* Steps
* Card
* Feature Grid
* Code Group
* File Tree
* API Table
* Badge

Every component remains fully editable after installation.

---

## Phase 3 — Vue Ecosystem Adapters

Adapters integrate OderaDocs with existing Vue documentation tooling.

### Initial Adapter — Nuxt

Built on top of Nuxt Content.

#### Responsibilities

* Nuxt module
* Component registration
* MDC integration
* Table of Contents integration
* Collections support
* Surround navigation
* Search integration

### Future adapters

* VitePress
* Vite + Vue
* Astro + Vue

Adapters leverage mature ecosystems rather than replacing them.

---

## Phase 4 — Registry Ecosystem

Expand the ecosystem beyond the core project.

### Objectives

* Community registries
* Starter templates
* Registry publishing tools
* Registry metadata
* Version compatibility
* Registry validation

Every registry conforms to the OderaDocs Registry Specification, ensuring interoperability across the ecosystem.

---

## Phase 5 — Developer Experience

Improve the development workflow without blocking the initial release.

Examples include:

* Import rewriting
* Local registry caching
* Registry bundles
* Interactive CLI
* Registry search
* Registry diffing
* Upgrade assistance

These improvements enhance the developer experience while remaining secondary to a stable architecture.

---

## Design Principles

### Open Code

Every installed file belongs to the developer.

OderaDocs provides source code—not runtime abstractions.

### Vue Ecosystem First

OderaDocs is designed specifically for the Vue ecosystem.

Framework integrations are implemented through adapters while the core remains framework-agnostic.

### Registry Driven

Everything installable is a registry item.

Examples include:

* Components
* Documentation blocks
* Layouts
* Themes
* Utilities
* Starters
* Plugins

The registry is the single distribution mechanism for the ecosystem.

### Stable Releases

Registry items are always installed from versioned releases rather than the `main` branch, ensuring reproducible installations and reliable upgrades.

### Build on Existing Tools

OderaDocs integrates with mature tooling whenever appropriate instead of reinventing it.

Examples include:

* Nuxt Content
* Reka UI
* Iconify

### Opinionated, Not Restrictive

OderaDocs provides sensible defaults while keeping every implementation fully editable.

Developers are never locked into framework decisions.

### Application Concerns Belong to the Application

OderaDocs intentionally does **not** manage:

* Authentication
* Internationalization
* State management
* Analytics
* Data fetching
* Business logic

These concerns remain the responsibility of the consuming application. Because every registry item is installed as open code, developers are free to integrate their preferred libraries and architecture without restriction.
