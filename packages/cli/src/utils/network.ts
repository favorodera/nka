import { ofetch } from 'ofetch'

export const nkaFetch = ofetch.create({
  headers: {
    accept: 'application/json',
  },
  retry: 5,
  retryDelay: 1000,
  timeout: 10_000,
})
