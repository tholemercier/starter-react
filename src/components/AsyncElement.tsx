import { Spinner } from "./icons/Spinner";

import type { UseQueryResult } from "@tanstack/react-query";
import type { PropsWithChildren, ReactNode } from "react";

type ExtProps<T> = PropsWithChildren<{ data: T, fallback?: ReactNode }>;

export const AsyncElement = <T extends UseQueryResult>(props: ExtProps<T>) => {

  if (props.data.isFetching) {
    return <Spinner width="12px" height="12px" />;
  }

  if (props.data.isError) {
    return props.fallback ?? "Error";
  }

  return props.children;

};
