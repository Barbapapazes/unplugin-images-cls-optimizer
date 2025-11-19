import type { Options, ResolvedOptions } from '../types.js'

export function resolveOptions(userOptions: Options): ResolvedOptions {
  const defaultOptions: ResolvedOptions = {}

  const options = {
    ...defaultOptions,
    ...userOptions,
  }

  return options as ResolvedOptions
}
