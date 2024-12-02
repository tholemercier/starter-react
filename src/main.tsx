import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { BreakpointContextProvider } from "./contexts/BreakpointContext";
import { typedAsserted } from "./utils/types";

createRoot(typedAsserted(document.getElementById("root"))).render(
  <StrictMode>
    <BreakpointContextProvider>
      <App />
    </BreakpointContextProvider>
  </StrictMode>,
);
