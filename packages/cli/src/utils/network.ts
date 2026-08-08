import { ofetch } from 'ofetch'

/** Shared configuration for HTTP requests. */
const fetchBaseConfig = {
  retry: 5,
  retryDelay: 1000,
  timeout: 10_000,
}

/**
 * Fetch client for text-based responses.
 *
 * Intended for source files and other plain-text resources,
 * such as `.ts` or `.vue` files.
 */
export const nkaTextFetch = ofetch.create({
  ...fetchBaseConfig,
  headers: {
    accept: 'text/plain, text/javascript, */*',
  },
  responseType: 'text',
})

/**
 * Fetch client for JSON responses.
 *
 * Intended for APIs, metadata, configuration, and other
 * resources that return JSON data.
 */
export const nkaJsonFetch = ofetch.create({
  ...fetchBaseConfig,
  headers: {
    accept: 'application/json',
  },
  responseType: 'json',
})
