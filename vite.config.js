import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Default to root path for live server deployments.
  // Override with VITE_BASE_PATH (example: /feedback-evaluation-system/ for GitHub Pages).
  const envBasePath = process.env.VITE_BASE_PATH;
  const base = command === 'build'
    ? (envBasePath || '/')
    : '/';

  return {
    plugins: [react()],

    // Serve static files from the 'public' folder
    publicDir: 'public',

    // Dev server configuration
    server: {
      port: 5173,  // You can change if needed
      open: true   // Opens browser automatically
    },

    // Build configuration
    build: {
      outDir: 'dist',     // Output folder
      sourcemap: false     // Set to false for production to reduce file size
    },

    // Base path (dynamic)
    base,
  }
})
