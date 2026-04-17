import { defineConfig } from 'vite'

export default defineConfig({
  // Resolve bare imports (gsap, lenis, split-type) from node_modules
  resolve: {
    alias: {},
  },

  // Dev server config
  server: {
    port: 5173,
    open: true, // Auto-open browser on `npm run dev`
  },

  build: {
    // ES2020+ for clean modern output; no polyfills needed
    target: 'es2020',
    // Minify for production
    minify: 'esbuild',
    // Rollup options for chunk splitting
    rollupOptions: {
      output: {
        // Keep GSAP in its own chunk for caching
        manualChunks: {
          gsap:  ['gsap'],
          lenis: ['lenis'],
        },
      },
    },
  },

  // PostCSS will be picked up automatically if postcss.config.js is present
  css: {
    devSourcemap: true,
  },
})
