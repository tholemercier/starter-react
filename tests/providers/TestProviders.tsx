import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";

import type { PropsWithChildren, ReactElement } from "react";

const queryClient = new QueryClient();

const WithProviders = (props: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
): ReturnType<typeof render> => render(ui, { wrapper: WithProviders, ...options });
