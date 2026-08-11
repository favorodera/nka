/** Configuration for Nka. */
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
     * @example "utils"
     * @example "src/utils"
     */
    dir: string

    /**
     * Module specifier used when rewriting utility imports.
     * Installed components will import utilities using this value.
     * @example "@/utils"
     * @example "~/utils"
     */
    import: string
  }

  /** Theme and typeset stylesheet configuration. */
  styles: {
    /**
     * Directory where Nka theme styles are installed.
     * This path is relative to the project root.
     * @example "assets/css/nka"
     * @example "src/assets/css/nka"
     */
    dir: string
  }

  /**
   * Custom registry sources.
   * Each key identifies a registry and its value points to the registry manifest/index.
   * @example
   * ```ts
   * registries: {
   *   acme: "https://registry.acme.dev/index.json",
   *   julio: "https://julio.dev/nka/index.json",
   * }
   * ```
   */
  registries: Record<string, string>
}