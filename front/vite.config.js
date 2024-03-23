import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react'

export default defineConfig ({
  plugins:[reactRefresh()],
  build: {
    rollupOptions: {
      input: {
        table: './src/table/table.html',
        options: './src/popup/popup.html',
      },
    },
  },
});
