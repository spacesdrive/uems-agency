import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  build: {
    target: 'es2022',
    // One stylesheet (~10 kB gzipped) so every pre-rendered page is fully styled before JS runs.
    cssCodeSplit: false,
    modulePreload: { polyfill: false },
  },
});
