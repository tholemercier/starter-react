import { expect, test } from "vitest";

import { capitalize } from "../../../src/utils/vendors/lodash";

test("lodash Availability test ", () => {
  expect(capitalize("test")).toBe("Test");
});
