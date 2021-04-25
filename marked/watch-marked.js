import chokidar from 'chokidar';
import path from 'path';
import { buildHtmlFromMd } from './buildHtmlFromMd.js';

const watcher = chokidar.watch(path.resolve('news'));

watcher.on('change', (filePath) => {
  if (filePath.endsWith('.md') || filePath.endsWith('template.html')) {
    buildHtmlFromMd();
  }
});
