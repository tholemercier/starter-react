import { expect, test } from "vitest";

import { ensureArray, excludeValues, excludeFalsy } from "../../src/utils/arrays";

test("Checks that ensureArray returns an array", () => {
  expect(ensureArray("a")).toMatchObject([ "a" ]);
  expect(ensureArray([ "a" ])).toMatchObject([ "a" ]);
  expect(ensureArray(null)).toMatchObject([ ]);
  expect(ensureArray(undefined)).toMatchObject([ ]);
  expect(ensureArray(false)).toMatchObject([ false ]);
  expect(ensureArray(true)).toMatchObject([ true ]);
});

test("Checks that excludeFalsy filters out Falsy values", () => {
  expect([ "a", "", null, undefined, false, "b" ].filter(excludeFalsy)).toMatchObject([ "a", "b" ]);
});

test("Checks that excludeValues will exclude the given values", () => {
  expect([ "a", "b" ].filter(excludeValues([ "a" ]))).toMatchObject([ "b" ]);
});
