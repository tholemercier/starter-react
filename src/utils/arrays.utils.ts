export function ensureArray<T>(x: T | T[]) {
  return ([] as T[]).concat(x ?? [])
}

export function nonNullFilter<T>(x: T | Falsy): x is T {
  return !!x
}

/**
 * Typesafe filter out function. The returned type will exclude the given
 * values.
 *
 * Initial Array Type = (1 | 2 | 3 | 4 | 5 | 6)[]
 *
 * FiltereOut Array Type = (1 | 2 | 3)[]
 * @example
 * const toExclude = [4,5,6]
 * const toFilter = [1,2,3,4,5,6]
 * const filteredOut = toFilter.filter(excludeFilter(toExclude))
 * >> filteredOut === [1,2,3] === as type (1 | 2 | 3)[]
 *
 * @param tt An array of values to filter out of the initial array
 */
export function excludeFilter<T, TT extends T>(tt: TT[]) {
  return (t: T): t is Exclude<T, TT> => !tt.includes(t as TT)
}
