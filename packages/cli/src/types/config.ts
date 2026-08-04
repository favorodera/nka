/** Interface representing the configuration for Nka. */
export interface NkaConfig {
  /** Configuration for components. */
  components: {
    /** The directory where components are located. */
    dir: string

    /** The directory where utils are located. */
    utilsDir: string
  }
}
