// Core schema specs
export { type Component, ComponentSchema } from '../ts-schemas/component'
export { type Metadata, MetadataSchema } from '../ts-schemas/metadata'
export { type Registry, RegistrySchema } from '../ts-schemas/registry'
export { type Template, TemplateSchema } from '../ts-schemas/template'
export { type Utility, UtilitySchema } from '../ts-schemas/utility'

// Shared schema specs
export { type ItemBase, ItemBaseSchema } from '../ts-schemas/shared/base'
export {
  type Dependencies,
  DependenciesSchema,
  type PackageDependencies,
  PackageDependenciesSchema,
} from '../ts-schemas/shared/dependencies'
export { type File, FileSchema } from '../ts-schemas/shared/file'
export { type Repository, RepositorySchema } from '../ts-schemas/shared/repository'
