import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const distDir = 'dist';
const shopifyAssetsDir = join('shopify', 'assets');

if (!existsSync(shopifyAssetsDir)) {
  mkdirSync(shopifyAssetsDir, { recursive: true });
}

const files = [
  { src: join(distDir, 'shopify-ui.es.js'), dest: join(shopifyAssetsDir, 'shopify-ui.es.js') },
  { src: join(distDir, 'shopify-ui.umd.cjs'), dest: join(shopifyAssetsDir, 'shopify-ui.umd.cjs') },
];

for (const file of files) {
  if (existsSync(file.src)) {
    copyFileSync(file.src, file.dest);
    console.log(`Copied ${file.src} -> ${file.dest}`);
  } else {
    console.warn(`Warning: ${file.src} not found. Run 'npm run build' first.`);
  }
}

console.log('Shopify assets build complete!');
