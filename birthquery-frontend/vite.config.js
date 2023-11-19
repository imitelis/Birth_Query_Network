import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],    
  server: {
    host: true,
    strictPort: true,
    port: 9000,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
        target: 'http://backend:8000/',
        changeOrigin: true,
        secure: false,
        
      },
    },
  },
});
