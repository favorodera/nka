/**
 * Configuration for Nka.
 */
export interface NkaConfig {
  /** Component installation and import configuration. */
  components: {
    /**
     * Directory where components are installed.
     * This path is relative to the project root.
     * @example "components"
     * @example "src/components"
     */
    dir: string

    /**
     * Module specifier used when rewriting component imports.
     * Installed components will import other components using this value.
     * @example "@/components"
     * @example "~/components"
     */
    import: string
  }

  /** Shared utility installation and import configuration. */
  utils: {
    /**
     * Directory where shared utilities are installed.
     * This path is relative to the project root.
     * @example "lib"
     * @example "src/lib"
     */
    dir: string

    /**
     * Module specifier used when rewriting utility imports.
     * Installed components will import utilities using this value.
     * @example "@/lib"
     * @example "~/lib"
     */
    import: string
  }
}
