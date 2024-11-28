export const setTypeGuard = <T>(set: readonly T[]) => {
  return (s: unknown): s is T => set.includes(s as T);
};

type Assert = (condition: unknown, message?: string) => asserts condition;
/**
 * Asserts that the value is a value or throw an error if the value is Falsy
 * @see https://www.tutorialsteacher.com/typescript/type-assertion
 * @param x value to be asserted
 */
const typedAssert: Assert = (x: unknown): asserts x => {
  if (x) {
    return;
  }

  // Early exit if browser
  if (typeof window !== "undefined") {
    throw new Error("Assertion failed: x is falsy");
  }
};

/**
 * Returns the value as type if not Falsy.
 * Util function used when the value should not be Falsy
 *
 * If the value is Falsy, this will throw an error
 * @see https://www.tutorialsteacher.com/typescript/type-assertion
 * @param x value to be asserted
 */
export const typedAsserted = <T>(x: T | Falsy): T => {
  typedAssert(x);
  return x;
};

export const isTruthy = <T>(val: T | Falsy): val is T => !!val;

export const isTruthyOrDefault = <T>(val: T | Falsy, def: T) => {
  return isTruthy(val) ? val : def;
};
