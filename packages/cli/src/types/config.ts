/** Nka configuration. */
export interface NkaConfig {
  /** Component install path and import alias. */
  components: {
    /** Relative directory for components. */
    dir: string

    /** Import alias for components (e.g. "@/components"). */
    import: string
  }

  /** Utility install path and import alias. */
  utils: {
    /** Relative directory for utilities. */
    dir: string

    /** Import alias for utilities (e.g. "@/utils"). */
    import: string
  }

  /** Stylesheet install path. */
  styles: {
    /** Relative directory for Nka styles. */
    dir: string
  }

  /** Named registry sources (name → index URL). */
  registries: Record<string, string>
}
