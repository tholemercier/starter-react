export const updateUrlWithoutRefresh = (url: URL) => {
  window.history.pushState(null, "", url.toString());
};

export const getSearchParams = () => {
  const url = new URL(window.location.href);
  const params: Record<string, string[]> = {};
  const entries = url.searchParams.entries();
  for (const [ k, v ] of entries) {
    params[k] = v.split(",");
  };

  return params;
};
