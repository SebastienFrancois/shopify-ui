import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'docs',
  base: '/shopify-ui/',
  build: {
    outDir: resolve(__dirname, 'docs-dist'),
    emptyOutDir: true,
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  resolve: {
    alias: {
      '@shopify-ui': resolve(__dirname, 'src'),
    },
  },
});
