import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { recordEntries } from "../utils/records";

import type { PropsWithChildren } from "react";

const breakpoints = {
  base: "0px",
  xs: "320px", // extra small mobile
  sm: "481px", // small mobile
  st: "601px", // small tablet
  md: "1025px", // medium desktop
  lg: "1281px", // large desktop
  xl: "1441px", // extra large desktop
};

type Breakpoint = keyof typeof breakpoints;

const match = (bp: Record<Breakpoint, string> = breakpoints) => {
  const [ base, ...breakpointsAndQueries ] = recordEntries(bp);
  for (const [ breakpoint, query ] of breakpointsAndQueries.reverse()) {
    if (window.matchMedia(`(min-width: ${query})`).matches) {
      return breakpoint;
    }
  }
  return base[0];
};

const useProvideContext = () => {
  const [ breakpoint, setBreakpoint ] = useState<Breakpoint>(match());

  useEffect(() => {
    const onResize = () => setBreakpoint(match());
    window.addEventListener("resize", onResize);
    () => window.removeEventListener("resize", onResize);
  }, [ setBreakpoint ]);

  return useMemo(
    () => ({ breakpoint, isMobile: [ "base", "xs", "sm" ].includes(breakpoint) }),
    [ breakpoint ],
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = createContext<ReturnType<typeof useProvideContext>>({} as any);

export const BreakpointContextProvider = ({ children }: PropsWithChildren) => {
  const context = useProvideContext();
  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

export const useBreakpointContext = () => useContext(Context);

export const useIsMobile = () => {
  const { isMobile } = useBreakpointContext();

  return isMobile;
};
