import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ArchiMind/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vis-network': ['vis-network']
        }
      }
    }
  }
}); 