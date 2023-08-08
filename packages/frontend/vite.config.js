import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import envCompatible from 'vite-plugin-env-compatible';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  envPrefix: 'DDDFORUM_',
  plugins: [
    react(),
    // viteTsconfigPaths(),
    svgrPlugin(),
    checker({
      typescript: true,
    }),
    envCompatible({ prefix: 'DDDFORUM_' }),
  ],
  server: {
    port: 3001,
    open: false,
  },
  preview: {
    port: 3001,
  },
});
