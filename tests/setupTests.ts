import { afterEach, beforeAll, afterAll, test, expect } from "vitest";
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// Establish API mocking before all tests
// Making sure we're up in our testing browser
beforeAll(() => {
  server.listen();
  test("Setup...", () => {
    expect(typeof window).not.toBe("undefined");
  });
});

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Close the server after all tests
afterAll(() => server.close());
