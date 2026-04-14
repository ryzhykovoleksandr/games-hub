import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('LaunchOverlay')) {
            return 'launch-overlay';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['svelte'],
  },
})
