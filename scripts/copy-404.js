import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');
const indexPath = resolve(distDir, 'index.html');
const notFoundPath = resolve(distDir, '404.html');

if (!existsSync(indexPath)) {
  console.error('postbuild: dist/index.html not found. Did the build step succeed?');
  process.exit(1);
}

try {
  copyFileSync(indexPath, notFoundPath);
  console.log('postbuild: copied dist/index.html to dist/404.html for SPA fallback.');
} catch (error) {
  console.error('postbuild: failed to create dist/404.html', error);
  process.exit(1);
}
