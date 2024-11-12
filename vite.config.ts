import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
dotenv.config()

const apiUrl = process.env.VITE_API_URL
const apiKey = process.env.VITE_API_KEY
const port = parseInt(process.env.VITE_PORT ?? '3000', 10)
const host = process.env.VITE_HOST ?? 'localhost'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ react() ],
  server: {
    port: port,
    host: host,
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
        configure: (proxy/*, _options*/) => {
          proxy.on('error', (err, req, res) => {
            console.log('-----------------------------')
            console.log('proxy error', err)
            console.log({ req, res })
            console.log('-----------------------------')
          })
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.url)
            console.log({ proxyReq, req, res })
            console.log('-----------------------------')
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
            console.log({ proxyRes, req, res })
            console.log('-----------------------------')
          })
        },
        headers: { ...(apiKey && { 'Authorization': apiKey }) },
      },
    },
  },
  build: {
    sourcemap: process.env.VITE_SOURCEMAP === 'true',
    outDir: process.env.VITE_OUTPUT_DIR ?? 'build',
  },
})
