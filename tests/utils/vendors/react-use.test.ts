import { act, renderHook } from "@testing-library/react";

import { expect, test } from "vitest";

import { useToggle } from "../../../src/utils/vendors/react-use";

test("react-use Availability test ", () => {
  const { result } = renderHook(() => useToggle(false));

  // Initial Value
  expect(result.current[0]).toBe(false);

  // Action that triggers a re-render with a value update
  act(() => result.current[1]());

  // Next Value
  expect(result.current[0]).toBe(true);
});
