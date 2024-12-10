import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { queryClient } from "./api/reactQueryConfig";
import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { GlobalError } from "./components/GlobalError";
import { BreakpointContextProvider } from "./contexts/BreakpointContext";
import { typedAsserted } from "./utils/types";

import "./global.scss";

createRoot(typedAsserted(document.getElementById("root"))).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={GlobalError}>
      <QueryClientProvider client={queryClient}>
        <BreakpointContextProvider>
          <App />
        </BreakpointContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
