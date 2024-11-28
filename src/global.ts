declare global {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  type Primitive = Function | Date | number | string | boolean | null | undefined;
  type StringKeyOf<T> = Extract<keyof T, string>;
  type RecordKeys<T> = T extends Primitive ? never : StringKeyOf<T>[];
  type RecordEntries<T> = T extends Primitive
    ? never
    : NonNullable<
      {
        [K in StringKeyOf<T>]: [K, T[K]];
      }[StringKeyOf<T>]
    >[];
  type Falsy = null | false | undefined | 0 | "" | void;
}

export {};
