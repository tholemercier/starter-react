import { QueryClient } from "@tanstack/react-query";

import { HTTPError, HttpStatusCode } from "./http.types";
import { oneMinute } from "../utils/datatime";

import type { UseQueryOptions } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: oneMinute * 15,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      retryOnMount: true,
    },
  },
});

export const handleRetries = (retryOnFailure?: boolean) => (failureCount: number, error: unknown) => {
  if (retryOnFailure) {
    return true;
  }

  if (error instanceof HTTPError) {
    const isUnderRetryLimit = failureCount < 4;
    const isTimeout = [
      HttpStatusCode.RequestTimeout,
      HttpStatusCode.GatewayTimeout,
      HttpStatusCode.Conflict,
    ].includes(error.statusCode);

    // retry only for 408 Request Timeout, 504 Gateway Timeout, and 409 Conflict.
    if ((isUnderRetryLimit && isTimeout)) {
      return true;
    }
  }

  return false;
};

const handleThrowOnError = (_error: Error) => {
  // Not the best place to handle errors.
  // Consider interceptors such as axios interceptors
  // If you use throwOnError true, an ErroBoundary will be necessary.
  return false;
};

type QueryOptionsNoKey<T, S = unknown> = Omit<UseQueryOptions<T>, "queryKey"> & S;

export const getQueryOptions = <T>(queryFn: () => Promise<T>, options?: QueryOptionsNoKey<T, { retryOnFailure?: boolean }>): QueryOptionsNoKey<T> => {
  const staleTime = (options?.staleTime as number) ?? oneMinute;
  const gcTime = staleTime + oneMinute;

  const { retryOnFailure, ...rest } = options ?? {};

  return {
    queryFn,
    staleTime,
    gcTime,
    // Delay to double with each attempt (starting at 800ms), max 30s
    retryDelay: (attemptIndex: number) => Math.min(800 * 2 ** attemptIndex, 30000),
    retry: handleRetries(retryOnFailure),
    throwOnError: handleThrowOnError,
    ...rest,
  };
};
