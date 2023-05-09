import { defineConfig } from 'vite';
const { resolve } = require('path');

const root = 'src';

export default defineConfig({
  root: root,
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          }
          if (extType === 'css') {
            return `assets/css/content.css`;
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: `assets/js/[name].js`,
        entryFileNames: `assets/js/[name].js`,
      },
      input: {
        main: resolve(__dirname, root, 'index.html'),
        lesson32: resolve(__dirname, root, 'lesson32/index.html'),
      },
    },
  },
});
