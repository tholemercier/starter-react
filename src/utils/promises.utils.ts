import { timeLikeToMs } from "./datatime.utils";
import { logger } from "./logs.utils";

import type { TimeLike } from "./datatime.utils";

type TryOptions = {
  times: number
  timeout: TimeLike
};
export async function tryTimes<T>(fn: () => T | Promise<T>, options?: TryOptions): Promise<T | null> {
  const { times = 4, timeout = 3000 } = options ?? {};
  for (let i = 0; i < times; i++) {
    try {
      const res = await fn();
      if (res) {
        return res;
      }
      throw Error("No Value");
    } catch (err) {
      logger.error("[tryTimes][error]", err);
      await sleepPromise(timeout);
    }
  }
  return null;
}

export const sleepPromise = (wait: TimeLike, error?: Error) => {
  let timer: number;
  const promise = new Promise<undefined>((resolve, reject) => {
    const execFn = error ? () => reject(error) : resolve;
    timer = setTimeout(execFn, timeLikeToMs(wait));
  });
  return Object.assign(promise, { clearTimeout: () => clearTimeout(timer) });
};
