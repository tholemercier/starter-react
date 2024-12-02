import { setupServer } from "msw/node";

import { handlers } from "./handlers";
import { exampleHandlers } from "../_examples/mocks/handlers";

const allHandlers = [ ...handlers, ...exampleHandlers ];

// Setup the mock server with the handlers
export const server = setupServer(...allHandlers);
