import { useCallback, useMemo, useState } from "react";

import { ensureArray } from "../arrays";
import { getSearchParams, updateUrlWithoutRefresh } from "../navigation";

/**
 * WARNING
 *
 * If using react-router, especially HashRouter, please use useSearchParams from react-router-dom
 *
 * const [searchParams, setSearchParams] = useSearchParams();
 */
export const useLegacySearchParams = () => {
  const [ searchParams, setSearchParams ] = useState<Record<string, string[]>>(getSearchParams());

  const addOrUpdateSearchParam = useCallback(
    (key: string, _values: string | string[]) => {
      const url = new URL(window.location.href);
      const values = ensureArray(_values);
      if (url.searchParams.has(key)) {
        url.searchParams.set(key, values.join(","));
      } else {
        url.searchParams.append(key, values.join(","));
      }

      setSearchParams((prev) => ({ ...prev, [key]: values }));
      updateUrlWithoutRefresh(url);
    }, []);

  const clearSearchParam = useCallback((key?: string) => {
    const url = new URL(window.location.href);
    if (key && url.searchParams.has(key)) {
      url.searchParams.delete(key);
      setSearchParams((prev) => {
        const { [key]: _tmp, ...rest } = prev;
        return rest;
      });
    } else if (!key) {
      const keys = url.searchParams.keys();
      for (const k of keys) {
        url.searchParams.delete(k);
      };
      setSearchParams({});
    }

    updateUrlWithoutRefresh(url);
  }, []);

  return useMemo(() => ({
    addOrUpdateSearchParam,
    clearSearchParam,
    searchParams,
  }), [ addOrUpdateSearchParam, clearSearchParam, searchParams ]);
};

/**
 * Todo: To implement properly
 */
export const useReactRouterSearchParams = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const addOrUpdateSearchParam = useCallback(
  //   (key: string, _values: string|string[]) => {
  //     const values = ensureArray(_values);
  //     if (searchParams.has(key)) {
  //       searchParams.set(key, values.join(","));
  //     } else {
  //       searchParams.append(key, values.join(","));
  //     }

  //     setSearchParams(searchParams);
  //   }, []);

  // const clearSearchParam = useCallback((key?: string) => {
  //   if (key && searchParams.has(key)) {
  //     searchParams.delete(key);
  //   } else if (!key) {
  //     const keys = searchParams.keys();
  //     for (const k of keys) {
  //       searchParams.delete(k);
  //     };
  //   }

  //   setSearchParams(searchParams);
  // }, []);

  // return useMemo(() => ({ addOrUpdateSearchParam, clearSearchParam, searchParams }), [ addOrUpdateSearchParam, clearSearchParam ]);
  return null;
};
