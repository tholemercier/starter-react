import { useCallback, useMemo, useState } from "react";

import { useLegacySearchParams } from "./useSearchParams";
import { ensureArray } from "../arrays";

/**
 * A hook that behaves like useState but sync the state
 * with URLSearchParams
 */
export const useSearchParamsState = (key: string) => {
  const { searchParams, addOrUpdateSearchParam, clearSearchParam } = useLegacySearchParams();
  const [ searchParam, setSearchParam ] = useState<string[] | undefined>(searchParams[key]);

  const setValue = useCallback((newValue?: string | string[]) => {
    if (newValue) {
      addOrUpdateSearchParam(key, newValue);
      setSearchParam(ensureArray(newValue));
    } else {
      clearSearchParam(key);
      setSearchParam(undefined);
    }
  }, [ addOrUpdateSearchParam, clearSearchParam, key ]);

  return useMemo(() => [ searchParam, setValue ] as const, [ searchParam, setValue ]);
};
