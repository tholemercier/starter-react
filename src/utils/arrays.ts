export function ensureArray<T>(x: T | T[]) {
  return ([] as T[]).concat(x ?? []);
}

export function excludeFalsy<T>(x: T | Falsy): x is T {
  return !!x;
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
 * const filteredOut = toFilter.filter(excludeValues(toExclude))
 * >> filteredOut === [1,2,3] === as type (1 | 2 | 3)[]
 *
 * @param tt An array of values to filter out of the initial array
 */
export function excludeValues<T, TT extends T>(tt: TT[]) {
  return (t: T): t is Exclude<T, TT> => !tt.includes(t as TT);
}

export const arraysAreDifferent = <T>(a: T[] = [], b: T[] = []) => {
  return (
    a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))
  );
};

export const arraysAreIdentical = <T>(a: T[] = [], b: T[] = []) => !arraysAreDifferent(a, b);
