/** Interface representing the configuration for OderaDocs. */
export interface DocsConfig {
  /** Configuration for components. */
  components: {
    /** The directory where components are located. */
    dir: string

    /** The directory where utils are located. */
    utilsDir: string
  }
}
