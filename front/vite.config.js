import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: './src/table/index.html',
        other: './src/popup/popup.html',
      },
      output: {
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index') {
            return 'dist/index/[name]-[hash].js';
          } else {
            return 'dist/popup/[name]-[hash].js';
          }
        },
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index') {
            return 'dist/index/[name]-[hash].js';
          } else {
            return 'dist/popup/[name]-[hash].js';
          }
        },
      },
    },
  },
});
