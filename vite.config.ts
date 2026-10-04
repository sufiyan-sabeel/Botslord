import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site: https://sufiyan-sabeel.github.io/Botslord/
// Base must match the repository name so built asset URLs resolve on Pages.
// Local dev: open http://127.0.0.1:5173/Botslord/ (Vite respects `base` in dev too).
export default defineConfig({
  plugins: [react()],
  base: '/Botslord/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true,
  },
});
