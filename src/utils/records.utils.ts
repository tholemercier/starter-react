export function isKey<T extends string>(k: string, r: Record<T, unknown>): k is T {
  return k in r
}

export function isKeyOf<T extends object>(k: string | symbol | number, r: T): k is keyof T {
  return !!r && k in r
}

export function keyIsDefined<T, K extends keyof T>(r: T, k: K): r is T & Required<Pick<T, K>> {
  return r[k] !== undefined
}

export function recordKeys<T extends object>(record: T): RecordKeys<T> {
  return Object.keys(record) as RecordKeys<T>
}

export function recordEntries<T extends object>(record: T): RecordEntries<T> {
  return Object.entries(record) as RecordEntries<T>
}
