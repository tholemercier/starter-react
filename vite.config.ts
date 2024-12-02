import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";
dotenv.config();

const apiUrl = process.env.VITE_API_URL;
const apiKey = process.env.VITE_API_KEY;
const port = parseInt(process.env.VITE_PORT ?? "3000", 10);
const host = process.env.VITE_HOST ?? "localhost";

// https://vite.dev/config/
export default defineConfig(() => ({
  plugins: [ react() ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setupTests.ts",
    include: [ "./tests/**/*.test.{ts,tsx}" ],
    exclude: [ "**/node_modules/**", `**/${process.env.VITE_OUTPUT_DIR ?? "build"}/**` ],
  },
  server: {
    port: port,
    host: host,
    proxy: {
      "/api": {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
        configure: (proxy/*, _options*/) => {
          proxy.on("error", (err, req, res) => {
            console.warn("-----------------------------");
            console.warn("proxy error", err);
            console.warn({ req, res });
            console.warn("-----------------------------");
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.warn("Sending Request to the Target:", req.url);
            console.warn({ proxyReq, req, res });
            console.warn("-----------------------------");
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            console.warn("Received Response from the Target:", proxyRes.statusCode, req.url);
            console.warn({ proxyRes, req, res });
            console.warn("-----------------------------");
          });
        },
        headers: { ...(apiKey && { "Authorization": apiKey }) },
      },
    },
  },
  build: {
    sourcemap: process.env.VITE_SOURCEMAP === "true",
    outDir: process.env.VITE_OUTPUT_DIR ?? "build",
  },
}));
