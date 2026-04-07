import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({ rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ShopifyUI',
      formats: ['es', 'umd'],
      fileName: (format) => `shopify-ui.${format === 'es' ? 'es.js' : 'umd.cjs'}`,
    },
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        assetFileNames: 'shopify-ui.[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@shopify-ui': resolve(__dirname, 'src'),
    },
  },
});
