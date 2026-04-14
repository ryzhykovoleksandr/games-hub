import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
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
});
