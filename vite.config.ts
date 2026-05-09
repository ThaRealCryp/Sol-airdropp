import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@walletconnect\/manifest$/,
        replacement: fileURLToPath(new URL('./local-modules/@walletconnect/manifest.ts', import.meta.url)),
      },
    ],
  },
});
