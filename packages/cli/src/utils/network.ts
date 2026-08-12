import { ofetch } from 'ofetch'

/**
 * Shared configuration for HTTP requests.
 * Includes retry logic and a timeout to handle network issues gracefully.
 */
const fetchBaseConfig = {
  retry: 5,
  retryDelay: 1000,
  timeout: 10_000,
}

/**
 * Text fetch client for source files.
 * Suitable for fetching plain text content such as scripts or stylesheets.
 */
export const nkaTextFetch = ofetch.create({
  ...fetchBaseConfig,
  headers: {
    accept: 'text/plain, text/javascript, */*',
  },
  responseType: 'text',
})

/**
 * JSON fetch client for registry and metadata.
 * Optimized for structured data like registry indexes and manifests.
 */
export const nkaJsonFetch = ofetch.create({
  ...fetchBaseConfig,
  headers: {
    accept: 'application/json',
  },
  responseType: 'json',
})
